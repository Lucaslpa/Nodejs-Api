/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Error = error.message;
  function response(status: number) {
    res.status(status).json({ Error });
  }

  switch (Error) {
    case 'employer not deleted':
      response(500);
      return;
    case 'employer not found':
      response(404);
      return;
    case 'id was not provided':
      response(400);
      return;
    case 'employer was not provided':
      response(400);
      return;
    case 'biography must be unique':
      res.status(409).json({ Error: 'biography already in use' });
      return;
    case 'cpf must be unique':
      res.status(409).json({ Error: 'cpf already in use' });
      return;
    case 'avatar must be unique':
      res.status(409).json({ Error: 'avatar already in use' });
      return;
    case 'email must be unique':
      res.status(409).json({ Error: 'email already in use' });
      return;
    default:
      response(500);
  }
};
