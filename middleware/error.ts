import {
  Request, Response, NextFunction, Application,
} from 'express';

export default function errorHandler(app: Application) {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next();
  });
}
