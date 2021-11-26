import { Request, Response, NextFunction } from 'express';
import { clientsModel } from '../../models';
import { ClientsTypes } from '../../types/Clients';

export const VerifyCustomerAlreadyExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cpf }: ClientsTypes = req.body;

  try {
    const isRepeated = await clientsModel.getByCpf(cpf);
    if (isRepeated) {
      res.status(409).json({ error: 'Customer already exist' });
    }
    next();
  } catch (err) {
    throw new Error('err');
  }
};
