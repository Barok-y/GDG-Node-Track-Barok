import {Product} from "../models/products";

export const getAllProducts = async (req, res , next) => {
    try{
            const {category, minPrice, maxPrice} = req.query;
            let query= {};
            if(category) query.category=category;
            if(minPrice || maxPrice){
                if (minPrice) query.price.$gte = minPrice;
                if (maxPrice) query.price.$lte = maxPrice;
            }
            const products =await Product.find(query);
            res.json(products);
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
        res.end("Product Deleted SUccessfully!!");
    }catch(Error){
        next(Error);
    }
};
