import userModel from "../Models/userModel.js";
import { validateUser } from "../Validation/userValidation.js";
import { errorHandler } from "../Utils/errorHandler.js";
import wrapAsync from "../Utils/wrapAsync.js";
import { validateLogin } from "../Validation/userLoginValidation.js";
import { ApiResponse } from "../Utils/responseHandler.js";

export const userRegister = wrapAsync(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        throw new errorHandler(400, error.details[0].message);
    }
    const { name, mobileNumber, age, country, isPremium, payment } = req.body;
    const user = await userModel.findOne({ mobileNumber });
    if (user) {
        throw new errorHandler(400, "Mobile number already exists");
    }
    const newUser = new userModel({ name, mobileNumber, age, country });
    const saveUser = await newUser.save();
    return res
        .status(201)
        .json(new ApiResponse(201, saveUser, "User registered successfully"));
});

export const userLogin = wrapAsync(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) {
        throw new errorHandler(400, error.details[0].message);
    }

    const { name, mobileNumber } = req.body;
    const normalizedName = name.toLowerCase(); // Normalize the name to match the format in the DB

    // Find user with a case-insensitive search for the name
    const user = await userModel.findOne({
        name: { $regex: new RegExp(`^${normalizedName}$`, "i") },
        mobileNumber,
    });

    if (!user) {
        throw new errorHandler(400, "Invalid name or mobile number");
    }

    return res.status(200).json(new ApiResponse(200, user, "Login successful"));
});

export const getAllUser = wrapAsync(async (req, res) => {
    const users = await userModel.find().populate("payment");
    return res
        .status(200)
        .json(new ApiResponse(200, users, "All users fetched successfully"));
});

export const getUser = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("payment");

    if (!user) {
        throw new errorHandler(404, "User not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully"));
});
