import { ISignUp } from "./interfaces/sign-up.interface";
import { ISignIn } from "./interfaces/sign-in.interface";

import Joi from 'joi';



export const signInValidation = (data: ISignIn) : Joi.ValidationResult => {
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

export const signUpValidation = (data: ISignUp ): Joi.ValidationResult => {
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
