import Joi from 'joi';

export const signInSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const signUpSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  login: Joi.string()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
});

export const resetPasswordSchema = Joi.object({
  resetToken: Joi.string()
    .required(),
  newPassword: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});
