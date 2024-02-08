import joi from "joi";

export const userValidation: joi.ObjectSchema = joi.object({
    login: joi.string().required(),
    password: joi.string().required(),
    balance: joi.number().required()
})

