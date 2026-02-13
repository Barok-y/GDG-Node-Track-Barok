import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 8,
        maxLength: 25
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock:{
        type:Number,
        required: true,
        min: 0
    },
    category: String,
    imageUrl: String
})

export const Product= mongoose.model('Product',productSchema);