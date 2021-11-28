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
    case 'Error: Validation isEmail on email failed':
      res.status(400).json({ Error: 'Invalid Email' });
      return;
    case 'Error: id_vehicle already in use':
      res.status(409).json({ Error: 'Vehicle already sold or reserved' });
      return;
    case 'Ops. This vehicle not exist':
      response(404);
      return;
    case 'query type transaction not provided':
      response(400);
      return;
    case 'transaction type is invalid. Should be:  available, reserved or sold':
      response(400);
      return;
    case 'sale not found':
      response(404);
      return;

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
