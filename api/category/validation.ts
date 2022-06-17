import Joi from 'joi';
import { ICategory } from './model';

const categoriesValidation = (data: ICategory): Joi.ValidationResult => {
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
export default categoriesValidation;
