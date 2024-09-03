import wrapAsync from "../Utils/wrapAsync.js";
import Admin from "../Models/adminModel.js";
import { ApiResponse } from "../Utils/responseHandler.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const loginAdmin = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin) {
        const result = await admin.isValidPassword(password);
        if (result) {
            return res
                .status(200)
                .json(new ApiResponse(200, admin, "Admin Login successful"));
        } else {
            throw new errorHandler(401, "Invalid password");
        }
    } else {
        throw new errorHandler(401, "Invalid email");
    }
});
