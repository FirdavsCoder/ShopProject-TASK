import joi from 'joi';

export const productValidation: joi.ObjectSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  count: joi.number().required()
});




