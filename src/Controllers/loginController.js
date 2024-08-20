import wrapAsync from "../Utils/wrapAsync.js";
import Admin from "../Models/adminModel.js";

export const loginAdmin = wrapAsync(async(req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
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