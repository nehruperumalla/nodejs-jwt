import Joi from "joi";

export const registerValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

export const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}
