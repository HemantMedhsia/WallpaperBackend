import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        mobileNumber: {
            type: Number,
            required: true,
            trim: true,
            unique: true,
        },
        age: {
            type: Number,
            required: true,
            min: 0, // Ensure age is a non-negative number
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        isPremium: {
            type: Boolean,
            default: false, // Indicates whether the user has premium access
        },
        payment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Payment",
            },
        ],
        premiumAcessToken: {
            type: String,
            default: "User token not available / Token Expired",
        },
    },
    {
        timestamps: true, // Automatically create createdAt and updatedAt fields
    }
);

userSchema.pre("save", function (next) {
    this.name = this.name.toLowerCase();
    next();
});

userSchema.methods.generatePremiumToken = function (value) {
    // Generate a token, using a secret key and some payload (like user ID)
    const token = jwt.sign(
        { id: this._id, mobileNumber: this.mobileNumber },
        process.env.JWT_SECRET, // Replace with your secret key
        { expiresIn: `${value}` } // Token expiration time
    );

    this.premiumAcessToken = token;
    return token;
};

userSchema.methods.isTokenValid = function () {
    try {
        jwt.verify(this.premiumAcessToken, process.env.JWT_SECRET);
        return true; // Token is valid
    } catch (err) {
        return false; // Token has expired or is invalid
    }
};

const User = mongoose.model("User", userSchema);

export default User;
