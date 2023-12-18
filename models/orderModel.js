import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    products: [
        {
            type: mongoose.ObjectId,
            ref: 'Product'
        }
    ],
    payment: {
        
    },
    buyer: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "delivered", "cancelled"]

    }
},
    { timestamps: true })

export default mongoose.model("Order", orderSchema)