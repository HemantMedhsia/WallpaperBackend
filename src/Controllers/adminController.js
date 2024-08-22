import Admin from "../Models/adminModel.js";
import { validationResult } from "express-validator";
import wrapAsync from "../Utils/wrapAsync.js";

// src/controllers/adminController.js

// @route   POST /api/admin/register
// @desc    Register a new admin
// @access  Public
export const registerAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Check if admin already exists
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }

        // Create a new admin instance
        admin = new Admin({
            name,
            email,
            password
        });

        // Save the admin to the database
        await admin.save();

        return res.status(201).json({ msg: 'Admin registered successfully' });
    } catch (err) {
        return res.status(500).send('Server error');
    }
};

// @route   GET /api/admin
// @desc    Get all admins
// @access  Public
export const getAllAdmins = wrapAsync(async (req, res) => {
    
        const admins = await Admin.find();
        res.status(200).json(admins);
});

// @route   GET /api/admin/:id
// @desc    Get admin by ID
// @access  Public
export const getAdminById = wrapAsync(async (req, res) => {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }
        res.json(admin);
});

// @route   PUT /api/admin/:id
// @desc    Update admin by ID
// @access  Public
export const updateAdminById = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        admin.name = name;
        admin.email = email;
        admin.password = password;

        await admin.save();

        res.json({ msg: "Admin updated successfully" });
    } catch (err) {
        res.status(500).send("Server error");
    }
});

// @route   DELETE /api/admin/:id
// @desc    Delete admin by ID
// @access  Public
export const deleteAdminById = wrapAsync(async (req, res) => {
        let admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        res.json({ msg: "Admin deleted successfully" });
    
});