import Joi from 'joi';

// Define the Joi validation schema
const userValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Name is required',
            'any.required': 'Name is required'
        }),
    mobileNumber: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Mobile number is required',
            'any.required': 'Mobile number is required'
        }),
    age: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Age must be a number',
            'number.min': 'Age must be a non-negative number',
            'any.required': 'Age is required'
        }),
    country: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Country is required',
            'any.required': 'Country is required'
        })
});

// Function to validate user data
const validateUser = (userData) => {
    return userValidationSchema.validate(userData);
};

export { validateUser };
