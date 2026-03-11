import {Product} from "../models/products.js";

export const getAllProducts = async (req, res , next) => {
    try{
            const {category, minPrice, maxPrice} = req.query;
            let query= {};
            if(category) query.category=category;
            if(minPrice || maxPrice){
                query.price= {};
                if (minPrice) query.price.$gte = Number(minPrice);
                if (maxPrice) query.price.$lte = Number(maxPrice);
            }
            const products =await Product.find(query);
            res.json({
                message: "Products:",
                products});
    }catch(error){
        next(error);
    }
};

export const getProductById = async (req,res,next) => {
    try{
    const product= await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product Not Found");
    }
    res.json(product);
}catch(error){
    next(error);
}
};

export const createProduct = async (req,res,next) => {
    try{
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }catch(Error){
        next(Error);
    }
};

export const updateProduct = async (req, res, next) => {
    try{
            const product = await Product.findByIdAndUpdate(req.params.id , req.body, {new:true});
            if(!product){
                res.status(404);
                throw new Error("Product Not Found");
            }
            res.json(product);
    }catch(Error){
        next(Error);
    }

};

export const deleteProduct = async (req, res, next) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            res.status(404);
            throw new Error("Product Not found to Delete!");
        }
        res.status(200).json({ 
            success: true, 
            message: "Product Deleted Successfully!!" 
        });
    }catch(Error){
        next(Error);
    }
};
