import wrapAsync from "../Utils/wrapAsync.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../Models/paymentModel.js";
import User from "../Models/userModel.js";
import { errorHandler } from "../Utils/errorHandler.js";
import { ApiResponse } from "../Utils/responseHandler.js";

export const payment = wrapAsync(async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        if (!req.body) {
            throw new errorHandler(400, "Bad Request");
        }

        const options = req.body;
        const order = await razorpay.orders.create(options);

        if (!order) {
            throw new errorHandler(400, "Bad Request");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, order, "Order created successfully"));
    } catch (error) {
        throw new errorHandler(500, error.message);
    }
});

export const validate = wrapAsync(async (req, res) => {
    // console.log(req.params.userId);
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
        throw new errorHandler(400, "Transaction is not legit!");
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
        throw new errorHandler(404, "User not found");
    }

    const result = new Payment(req.body);
    const paymentData = await result.save();
    user.payment.push(paymentData._id);
    user.isPremium = true;

    const token = user.generatePremiumToken("1m");

    await user
        .save()
        .then(() => {
            console.log("success");
        })
        .catch((err) => {
            console.log(err.message);
            throw new errorHandler(500, err.message);
        });
    // res.json({
    //     msg: `Transaction is legit! and payment sucessfully added to the user : ${user.name}`,
    //     orderId: razorpay_order_id,
    //     paymentId: razorpay_payment_id,
    //     amount: amount,
    //     premiumAcessToken: token,
    // });
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user,
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                amount,
                premiumAccessToken: token,
            },
            "Payment successful"
        )
    );
});

// export const verifyTokenWithId = wrapAsync(async (req, res) => {
//     const user = await User.findById(req.params.userid);
//     if (!user) {
//         throw new errorHandler(404, "User not found");
//     }

//     if (user.isTokenValid() == false) {
//         user.premiumAcessToken = "User token not available / Token Expired";
//         user.isPremium = false;
//         user.save()
//             .then(() => {
//                 return res.send("Your token Expired / Deleted");
//                 // throw new errorHandler(400, "Your token Expired / Deleted");
//             })
//             .catch((err) => {
//                 console.log(err.message);
//             });
//     } else {
//         return res
//             .status(200)
//             .json(new ApiResponse(200, user, "User Premium token is valid !"));
//     }
// });

export const verifyTokenWithId = wrapAsync(async (req, res) => {
    try {
        const user = await User.findById(req.params.userid);
        if (!user) {
            throw new errorHandler(404, "User not found");
        }

        if (!user.isTokenValid()) {
            user.premiumAcessToken = "User token not available / Token Expired";
            user.isPremium = false;
            await user.save();

            return res
                .status(400)
                .json(
                    new ApiResponse(400, null, "Your token Expired / Deleted")
                );
        }

        return res
            .status(200)
            .json(new ApiResponse(200, user, "User Premium token is valid!"));
    } catch (err) {
        console.error(err.message);
        throw new errorHandler(500, "Internal Server Error");
    }
});

// export const verifyTokenwithMobile = wrapAsync(async (req, res) => {
//     // console.log(req.params.userMobile);
//     const user = await User.findOne({ mobileNumber: req.params.userMobile });
//     if (!user) {
//         throw new errorHandler(404, "User not found");
//     }

//     if (user.isTokenValid() == false) {
//         user.premiumAcessToken = "User token not available / Token Expired";
//         user.isPremium = false;
//         user.save()
//             .then(() => {
//                 // res.send("Your token Expired / Deleted");
//                 throw new errorHandler(400, "Your token Expired / Deleted");
//             })
//             .catch((err) => {
//                 console.log(err.message);
//             });
//     } else {
//         return res
//             .status(200)
//             .json(new ApiResponse(200, user, "User Premium token is valid !"));
//     }
// });
export const verifyTokenwithMobile = wrapAsync(async (req, res) => {
    try {
        const user = await User.findOne({
            mobileNumber: req.params.userMobile,
        });
        if (!user) {
            throw new errorHandler(404, "User not found");
        }

        if (!user.isTokenValid()) {
            user.premiumAcessToken = "User token not available / Token Expired";
            user.isPremium = false;
            await user.save();

            return res
                .status(400)
                .json(
                    new ApiResponse(400, null, "Your token Expired / Deleted")
                );
        }

        return res
            .status(200)
            .json(new ApiResponse(200, user, "User Premium token is valid!"));
    } catch (err) {
        console.error(err.message);
        throw new errorHandler(500, "Internal Server Error");
    }
});

export const getAllTransction = wrapAsync(async (req, res) => {
    const transction = await Payment.find();
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                transction,
                "All transactions fetched successfully"
            )
        );
});

export const getSingleTransaction = wrapAsync(async (req, res) => {
    const { id } = req.params;

    const transaction = await Payment.findById(id);

    if (!transaction) {
        throw new errorHandler(404, "Transaction not found");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                transaction,
                "Transaction fetched successfully"
            )
        );
});
