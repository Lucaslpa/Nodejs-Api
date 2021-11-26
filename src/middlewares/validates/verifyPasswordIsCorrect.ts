/* eslint-disable object-curly-newline */
import { Request, Response, NextFunction } from 'express';
import { AdministratorTypes } from '../../types/Administrator';
import { BCRYPT } from '../../utils/bcrypt';

const bcrypt = new BCRYPT();

export const VerifyIfPasswordIsCorrect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password }: AdministratorTypes = req.body;
  const passwordIsCorrect = await bcrypt.compare(
    password,
    res.locals.administrator.password
  );

  if (!passwordIsCorrect) {
    res.status(401).json({ error: 'Password is invalid' });
    return;
  }

  next();
};
