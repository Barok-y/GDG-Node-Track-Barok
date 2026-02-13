import {Cart} from "../models/cart" ;
import {Product} from "../models/products";

export const getCart = async (req, res, next) => {
    try{
        const cart = await Cart.findOne().populate('items.productId');
        res.json(cart || {items: [] });
    }catch(Error){
        next(Error);
    }
};

export const addItem = async (req,res,next) => {
    try{
            const {productId, quantity} = req.body;
            const product = await Product.findById(productId);
            if(!product){
                res.status(404);
                throw new Error("Product not Found!!");
            }
            if(product.stock<quantity){
                res.status(400);
                throw new Error("Insufficient Amount of Material in Stock");
            }

            let cart = await Cart.findOne();
            if(!cart){
                cart = new Cart({items: []})
            }
            const itemIndex = cart.items.findIndex(product => product.productId.toString() == productId);
            if(itemIndex > -1){
                cart.items[itemIndex].quantity += quantity;
                }
            else{
                cart.items.push({productId,quantity});
            }
            await cart.save();
            res.status(201).json({message: "Added to Cart!!", cart});
    }catch(Error){
        next(Error);
    }
};

exports.updateCartItems = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      res.status(400);
      throw new Error("Quantity must be at least 1");
    }

    let cart = await Cart.findOne();
    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    const itemIndex = cart.items.findIndex(product => product.productId.toString() === productId);

    if (itemIndex > -1) {
      const product = await Product.findById(productId);
      if (product.stock < quantity) {
        res.status(400);
        throw new Error(`Only ${product.stock} items available in stock`);
      }

      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404);
      throw new Error("Product not found in cart");
    }
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
    try{
        const cart = await Cart.findOne();
        if(cart){
            cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
            await cart.save();
        } 
        res.json(cart);
    }catch(Error){
        next(Error);
    }
};