/* eslint-disable object-curly-newline */
import { Request, Response, NextFunction } from 'express';
import { AdministratorTypes } from '../../types/Administrator';

export const VerifyAdmValues = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password }: AdministratorTypes = req.body;

  if (!username) {
    res.status(400).json({ error: 'without username' });
    return;
  }

  if (!password) {
    res.status(400).json({ error: 'without password' });
    return;
  }

  next();
};
