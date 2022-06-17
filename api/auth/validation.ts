import Joi from 'joi';

export const signInSchema = Joi.object({
  login: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const signUpSchema = Joi.object({
  login: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});
