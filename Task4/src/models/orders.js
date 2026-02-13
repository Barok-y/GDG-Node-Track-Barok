import mongoose, {Schema} from "mongoose";

const orderSchema = Schema(
    {
        items: Array,
        total: {
            type: Number,
            min: 0
        },
        customerInfo:{
            type: String,
            address: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

export const Order= mongoose.model('Order', orderSchema);