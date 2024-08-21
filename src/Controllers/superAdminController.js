import superAdmin from "../Models/superAdminModel.js";
import { validationResult } from "express-validator";
import wrapAsync from "../Utils/wrapAsync.js";

export const registerSuperAdmin = wrapAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if super admin already exists
    let existingSuperAdmin = await superAdmin.findOne({ email });
    if (existingSuperAdmin) {
        return res.status(400).json({ msg: "Superadmin already exists" });
    }

    // Create a new super admin instance
    const newSuperAdmin = new superAdmin({
        name,
        email,
        password, // Ensure you hash the password before saving
    });

    // Save the super admin to the database
    await newSuperAdmin.save();

    return res.status(201).json({ msg: "Superadmin registered successfully" });
});


export const loginsuperAdmin = wrapAsync(async(req, res) => {
    const { email, password } = req.body;
    const admin = await superAdmin.findOne({ email });
    if (admin) {
        // Email exists in the database
        const result = await admin.isValidPassword(password);
        if (result) {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    } else {
        // Email does not exist in the database
        res.status(401).json({ message: "Invalid email" });
    }
})