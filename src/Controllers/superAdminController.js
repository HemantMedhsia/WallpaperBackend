import superAdmin from "../Models/superAdminModel.js";
import { validationResult } from "express-validator";
import wrapAsync from "../Utils/wrapAsync.js";
import { errorHandler } from "../Utils/errorHandler.js";
import { ApiResponse } from "../Utils/responseHandler.js";

export const registerSuperAdmin = wrapAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new errorHandler(400, errors.array()[0].msg);
    }

    const { name, email, password } = req.body;

    let existingSuperAdmin = await superAdmin.findOne({ email });
    if (existingSuperAdmin) {
        throw new errorHandler(400, "Superadmin already exists");
    }

    const newSuperAdmin = new superAdmin({
        name,
        email,
        password,
    });

    const saveUser = await newSuperAdmin.save();
    return res
        .status(201)
        .json(
            new ApiResponse(201, saveUser, "Superadmin registered successfully")
        );
});

export const loginsuperAdmin = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const admin = await superAdmin.findOne({ email });
    if (admin) {
        const result = await admin.isValidPassword(password);
        if (result) {
            return res
                .status(200)
                .json(new ApiResponse(200, admin, "Login successful"));
        } else {
            throw new errorHandler(401, "Invalid password");
        }
    } else {
        throw new errorHandler(401, "Invalid email");
    }
});
