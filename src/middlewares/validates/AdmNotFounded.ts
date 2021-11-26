/* eslint-disable object-curly-newline */
import { Request, Response, NextFunction } from 'express';
import { administratorModel } from '../../models';
import { AdministratorTypes } from '../../types/Administrator';

export const AdmNotFounded = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username }: AdministratorTypes = req.body;
  const admFromDB = await administratorModel.get(username);
  if (!admFromDB) {
    res.status(404).json({ error: 'administrator not founded' });
    return;
  }
  res.locals.administrator = admFromDB;

  next();
};
