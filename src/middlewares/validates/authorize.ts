import { Request, Response, NextFunction } from 'express';
import { JWT } from '../../utils/jwt/Jwt';

const jwt = new JWT();

export const Authorize = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  function unauthorizedResponse() {
    res.status(401).json({ error: 'Unauthorized' });
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

  const tokenIsValid = jwt.verifyToken(`${token}`);

  if (!tokenIsValid) {
    unauthorizedResponse();
    return;
  }

  next();
};
