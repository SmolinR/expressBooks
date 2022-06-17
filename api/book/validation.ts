import Joi from 'joi';

export const bookPostSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .alphanum()
    .required(),
  authorId: Joi.string()
    .max(24)
    .token()
    .required(),
});

export const bookGetSchema = Joi.object({
  users: Joi.boolean(),
  authorId: Joi.string()
    .max(24)
    .token(),
});
