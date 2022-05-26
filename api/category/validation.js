const Joi = require('joi');

exports.categoriesValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        icon: Joi.string()
            .required(),
    });
    return schema.validate(data);
};
