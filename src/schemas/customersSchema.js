import joi from 'joi';

export const customersSchema = joi.object({
    name: joi.string().allow(null, ''),
    phone: joi.string().allow(null, ''),
    cpf: joi.string().allow(null, ''),
    birthday: joi.string().allow(null, '')
  });