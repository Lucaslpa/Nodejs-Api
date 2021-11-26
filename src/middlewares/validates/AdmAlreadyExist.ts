/* eslint-disable object-curly-newline */
import { Request, Response, NextFunction } from 'express';
import { administratorModel } from '../../models';
import { AdministratorTypes } from '../../types/Administrator';

export const VerifyAdmValues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username }: AdministratorTypes = req.body;

  const isRepeated = await administratorModel.get(username);
  if (isRepeated) {
    res.status(409).json({ error: 'administrator already exist' });
  }

  next();
};
