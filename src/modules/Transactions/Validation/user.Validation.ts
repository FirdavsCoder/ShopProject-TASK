import joi from "joi";

export const transactionValidation = joi.object({
    product_id: joi.number().required(),
    product_count: joi.number().required()
})

