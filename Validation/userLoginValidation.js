import Joi from "joi";

export const validateLogin = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(100).required(),
        mobileNumber: Joi.string()
            .pattern(/^[0-9]+$/)
            .min(10)
            .max(15)
            .required(),
    });
    return schema.validate(data);
};
