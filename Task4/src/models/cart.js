import mongoose, {Schema} from "mongoose";

const cartSchema = Schema(
    {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }]
    }
)

export const Cart = mongoose.model('Cart',cartSchema);