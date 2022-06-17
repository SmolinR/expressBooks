import Joi from 'joi';

export const makeAdminSchema = Joi.object({
  id: Joi.string()
    .max(24)
    .required(),
});

export const deleteAdminSchema = Joi.object({
  id: Joi.string()
    .max(24)
    .required(),
});
