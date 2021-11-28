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

  const error400 = Error.match(/was not provided/gi);
  const error409 = Error.match(/must be unique/gi);

  if (error400?.length) {
    response(400);
    return;
  }

  if (error409?.length) {
    res
      .status(409)
      .json({ Error: Error.replace(/must be unique/gi, 'already in use') });
    return;
  }

  switch (Error) {
    case 'employer with this email not found':
      response(404);
      return;
    case 'employer not deleted':
      response(500);
      return;
    case 'employer not found':
      response(404);
      return;
    case 'invalid password':
      response(400);
      return;
    case 'employees not found':
      response(404);
      return;
    case 'vehicle not found':
      response(404);
      return;
    case 'Error: Validation len on cpf failed':
      res.status(400).json({ Error: 'Invalid cpf' });
      return;
    default:
      response(500);
  }
};
