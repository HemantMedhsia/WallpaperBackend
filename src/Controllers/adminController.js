import Admin from "../Models/adminModel.js";
import { validationResult } from "express-validator";
import wrapAsync from "../Utils/wrapAsync.js";
import { errorHandler } from "../Utils/errorHandler.js";
import { ApiResponse } from "../Utils/responseHandler.js";

export const registerAdmin = wrapAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new errorHandler(400, errors.array()[0].msg);
    }

    const { name, email, password } = req.body;
    let admin = await Admin.findOne({ email });
    if (admin) {
        throw new errorHandler(400, "Admin already exists");
    }

    admin = new Admin({
        name,
        email,
        password,
    });
    const saveUser = await admin.save();
    return res
        .status(201)
        .json(new ApiResponse(201, saveUser, "Admin registered successfully"));
});

export const getAllAdmins = wrapAsync(async (req, res) => {
    const admins = await Admin.find();
    return res
        .status(200)
        .json(new ApiResponse(200, admins, "All admins fetched successfully"));
});

export const getAdminById = wrapAsync(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
        throw new errorHandler(404, "Admin not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, admin, "Admin fetch Successfully"));
});

export const updateAdminById = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;

    let admin = await Admin.findById(req.params.id);
    if (!admin) {
        return res.status(404).json({ msg: "Admin not found" });
    }
    
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (password) admin.password = password;

    const updatedAdmin = await admin.save();
    return res
        .status(200)
        .json(new ApiResponse(200, updatedAdmin, "Admin updated successfully"));
});


export const deleteAdminById = wrapAsync(async (req, res) => {
    let admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
        throw new errorHandler(404, "Admin not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, admin, "Admin deleted successfully"));
});
