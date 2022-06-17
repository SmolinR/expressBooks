import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export default function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.method === 'GET' ? req.query : req.body;
    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    return next();
  };
}
