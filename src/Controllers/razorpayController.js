import wrapAsync from "../Utils/wrapAsync.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../Models/paymentModel.js";
import User from "../Models/userModel.js";

export const payment = wrapAsync(async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        if (!req.body) {
            return res.status(400).send("Bad Request");
        }

        const options = req.body;
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(400).send("Bad Request");
        }

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

export const validate = wrapAsync(async (req, res) => {
    console.log(req.params.userId);
    req.body.amount = req.body.amount / 100;
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
    } = req.body;

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(404).send("User not found");
    }

    const result = new Payment(req.body);
    const paymentData = await result.save();
    console.log(paymentData._id);
    user.payment.push(paymentData._id);
    user.isPremium = true;

    const token = user.generatePremiumToken();

    await user.save().then(() => {
        res.status(201).json({
            message: `payment sucessfully added to the user : ${user.name}`,
            token:token,
        });
    }).catch((err)=> {
        console.log(err.message)
    });
    res.json({
        msg: "Transaction is legit!",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: amount,
    });
});

export const verifyToken = wrapAsync(async (req,res)=> {
    const user = await User.findById(req.params.userid);
    if (!user) {
        return res.status(404).send("User not found");
    }

    if(user.isTokenValid()==false) {
        user.premiumAcessToken = "User token not available / Token Expired";
        user.save().then(()=> {
            res.send("Your token Expired / Deleted");
        }).
        catch((err)=> {
            console.log(err.message);
        })
    }
})
    
export const getAllTransction = wrapAsync(async (req, res) => {
    const transction = await Payment.find();
    return res.status(200).json(transction);
});

export const getSingleTransaction = wrapAsync(async (req, res) => {
    const { id } = req.params; // Assuming the transaction ID will be passed as a URL parameter

    // Find the transaction by ID
    const transaction = await Payment.findById(id);

    if (!transaction) {
        return res.status(404).json({ msg: "Transaction not found" });
    }

    return res.status(200).json(transaction);
});
