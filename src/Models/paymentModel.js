import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
},
{
    timestamps: true
});

const Payment = mongoose.model("Payment", paymentSchema);

export {Payment};
