import Joi from 'joi';

const categoriesSchema = Joi.object({
  title: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  icon: Joi.string()
    .required(),
});

export default categoriesSchema;
