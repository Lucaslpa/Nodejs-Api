/* eslint-disable object-curly-newline */
import { Request, Response, NextFunction } from 'express';
import { ClientsTypes } from '../../types/Clients';

export const VerifyCustomerValues = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address, cpf, birthday, email, name, phone, surname }: ClientsTypes =
    req.body;

  if (!address || !cpf || !birthday || !email || !name || !phone || !surname) {
    res.status(400).json({ error: 'wrong request' });
    return;
  }

  next();
};
