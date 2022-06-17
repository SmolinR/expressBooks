import Joi from "joi";
import { IMakeAdmin } from "./interfaces/make-admin.interface";

export const adminValidation = (data: IMakeAdmin): Joi.ValidationResult => {
  const schema = Joi.object({
    id: Joi.string()
      .max(24)
      .required(),
  });
  return schema.validate(data);
};
