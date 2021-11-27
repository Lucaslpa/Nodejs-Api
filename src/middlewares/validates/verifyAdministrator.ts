/* eslint-disable no-prototype-builtins */
import { Request, Response, NextFunction } from 'express';
import { JWT } from '../../utils/jwt/Jwt';

const jwt = new JWT();

export const verifyAdministrator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  function unauthorizedResponse() {
    res.status(401).json({ Error: 'Unauthorized' });
  }

  if (!authorization) {
    unauthorizedResponse();
    return;
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    unauthorizedResponse();
    return;
  }

  const tokenPayload = jwt.verifyToken(`${token}`);

  if (
    typeof tokenPayload !== 'string' &&
    tokenPayload &&
    tokenPayload.hasOwnProperty('role')
  ) {
    if (tokenPayload.role === 'administrator') {
      next();
      return;
    }
  }

  res.status(401).json({ Error: 'you are not a administrator' });
};
