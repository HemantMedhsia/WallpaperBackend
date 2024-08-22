import Joi from "joi";

export const validateLogin = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(100).required(),
        mobileNumber: Joi.number()
            .required(),
    });
    return schema.validate(data);
};
