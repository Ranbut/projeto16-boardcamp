import joi from 'joi';

export const customersSchema = joi.object({
    name: joi.string().min(3).required(),
    phone: joi.number().min(11).required(),
    cpf: joi.string().min(11).required(),
    birthday: joi.string().min(10).required()
  });