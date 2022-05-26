const Joi = require('joi');

exports.adminValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string()
            .max(24)
            .required(),
    });
    return schema.validate(data);
};
