import mongoose from "mongoose";
import {MongoURI} from "../config/env.js"; 

export const connectDB = async () => {
    try{
        await mongoose.connect(MongoURI);
        console.log("Connected to database!");
    }catch(Error){
        console.error(Error);
    }
}
