const Joi = require('joi');

const signInValidation = (data) => {
    const schema = Joi.object({
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

    return schema.validate(data);
};

const signUpValidation = (data) => {
    const schema = Joi.object({
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

    return schema.validate(data);
};

module.exports = { signInValidation, signUpValidation };
