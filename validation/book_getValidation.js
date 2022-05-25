const Joi = require('joi');

exports.bookGetValidation = (data) => {
    const schema = Joi.object({
        users: Joi.boolean(),
        authorId: Joi.string()
            .max(24)
            .token(),
    });
    return schema.validate(data);
};
