const Joi = require('joi');

exports.bookPostValidation = (data) => {
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
