import {Order} from "../models/orders";
import {Cart} from "../models/cart";
import {Product} from "../models/products";

export const createOrder = async (req, res,next) => {
    try{
        const cart = await Cart.findOne().populate('item.productId');
        if(!cart){
            res.status(400);
            throw new Error("Cart is EMpty!!");
        }
        let total = 0;
        for(let item of cart.itmes){
            if(item.productId.stock < item.quantity){
                res.status(400);
                throw new Error("Insufficient amount in Stock!");
            }
            total+= item.productId.price * item.quantity;
        }

        const order = await Order.create({
            items: cart.items,
            total,
            customerInfo: req.body.customerInfo
        });
        for(let item of cart.items){
            await Product.findByIdAndUpdate(item.productId._id, { $inc: { stock: -item.quantity}})
        }

        await Cart.findByIdAndDelete(cart._id);
        await cart.save();
        await Product.save();

        res.status(201).json(order, {message: "Order Created!"})

    }catch(Error){
        next(Error);
    }
}

export const getAllOrders = async (req,res,next) => {
    try{
        const orders = await Order.find();
        if(!orders){
            res.status(404);
            throw new Error("No Orders!!");
        }
        res.json(orders);
    }catch(Error){
        next(Error);
    }
} 

export const getOrderById = async (req,res,next) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            res.status(404);
            throw new Error("ORDER Not Found By Id");
        }
        res.json(order)
    }catch(Error){
        next(Error);
    }
};
