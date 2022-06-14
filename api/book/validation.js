const Joi = require('joi');

const bookPostValidation = (data) => {
  const schema = Joi.object({
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
  return schema.validate(data);
};

const bookGetValidation = (data) => {
  const schema = Joi.object({
    users: Joi.boolean(),
    authorId: Joi.string()
      .max(24)
      .token(),
  });
  return schema.validate(data);
};

module.exports = { bookPostValidation, bookGetValidation };
