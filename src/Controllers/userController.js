import userModel from "../Models/userModel.js";
import { validateUser } from "../../Validation/userValidation";
import errorHandler from "../Utils/errorHandler.js";
import wrapAsync from "../Utils/wrapAsync.js";

export const register = wrapAsync(async () => {
    const { error } = validateUser(req.body);
    if (error) {
        throw new errorHandler(400, error.details[0].message);
    }
    const { name, mobileNumber, age, country } = req.body;
    const user = userModel.findOne({ mobileNumber });
    if (user) {
        throw new errorHandler(400, "Mobile number already exists");
    }

    
});
