import Joi from "joi";

// Define the Joi validation schema
const userValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1) // Ensure at least one character
        .max(100) // Set a maximum length for name
        .required()
        .messages({
            "string.empty": "Name is required",
            "any.required": "Name is required",
        }),
    mobileNumber: Joi.number() // Ensure mobile number contains only digits
        .required()
        .messages({
            "string.empty": "Mobile number is required",
            "string.pattern.base": "Mobile number must contain only digits",
            "any.required": "Mobile number is required",
        }),
    age: Joi.number()
        .integer() // Ensure age is an integer
        .min(0)
        .required()
        .messages({
            "number.base": "Age must be a number",
            "any.required": "Age is required",
        }),
    country: Joi.string()
        .trim()
        .min(1) // Ensure at least one character
        .max(100) // Set a maximum length for country
        .required()
        .messages({
            "string.empty": "Country is required",
            "any.required": "Country is required",
        })
});

// Function to validate user data
const validateUser = (userData) => {
    return userValidationSchema.validate(userData, { abortEarly: false }); // Collect all errors
};

export { validateUser };
