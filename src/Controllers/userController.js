import userModel from "../Models/userModel.js";
import { validateUser } from "../Validation/userValidation.js";
import { errorHandler } from "../Utils/errorHandler.js";
import  wrapAsync  from "../Utils/wrapAsync.js";
import { validateLogin } from "../Validation/userLoginValidation.js";

export const userRegister = wrapAsync(async (req,res) => {
    const { error } = validateUser(req.body);
    if (error) {
        throw new errorHandler(400, error.details[0].message);
    }
    const { name, mobileNumber, age, country } = req.body;
    const user = await userModel.findOne({ mobileNumber });
    if (user) {
        throw new errorHandler(400, "Mobile number already exists");
    }
    const newUser = new userModel({ name, mobileNumber, age, country });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
});

export const userLogin = wrapAsync(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) {
        throw new errorHandler(400, error.details[0].message);
    }

    const { name, mobileNumber } = req.body;
    const normalizedName = name.toLowerCase(); // Normalize the name to match the format in the DB
    console.log(
        `Login attempt with name: ${name} and mobile number: ${mobileNumber}`
    );

    // Find user with a case-insensitive search for the name
    const user = await userModel.findOne({
        name: { $regex: new RegExp(`^${normalizedName}$`, "i") },
        mobileNumber,
    });

    console.log(`User found: ${user}`);

    if (!user) {
        console.log("User Not found");
        throw new errorHandler(400, "Invalid name or mobile number");
    }

    res.status(200).json({ message: "Login successful" });
});
