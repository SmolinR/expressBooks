import Joi from 'joi';
import { IBookGet } from './interfaces/book-get.interface';
import { IBookPost } from './interfaces/book-post.interface';

export const bookPostValidation = (data: IBookPost ): Joi.ValidationResult => {
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

export const bookGetValidation = (data: IBookGet): Joi.ValidationResult => {
  const schema = Joi.object({
    users: Joi.boolean(),
    authorId: Joi.string()
      .max(24)
      .token(),
  });
  return schema.validate(data);
};
