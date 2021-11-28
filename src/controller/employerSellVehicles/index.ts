/* eslint-disable no-prototype-builtins */
import { Request, Response, NextFunction } from 'express';
import { Error } from 'sequelize/dist';
import { Employees_vehiclesService } from '../../services/employees_vehicles';
import { VehicleService } from '../../services/vehicles';
import { EmployeesService } from '../../services/employees';

import { sequelize } from '../../db/connectDB';
import { JWT } from '../../utils/jwt/Jwt';

const jwt = new JWT();

export const EmployeesSalesVehiclesController = () => ({
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionID = Number(req.params.id);
      if (!transactionID) throw 'id was not provided';
      const transaction = await Employees_vehiclesService(sequelize).getOne(
        transactionID
      );
      if (!transaction) throw 'transaction not found';
      const employer = await EmployeesService(sequelize).getOne(
        transaction.id_employer
      );
      const vehicle = await VehicleService(sequelize).getOne(
        transaction.id_vehicle
      );
      if (!employer || !vehicle) throw 'something was wrong';
      res.status(200).json({ ...transaction, seller: employer, vehicle });
    } catch (err: any) {
      next(new Error(err));
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vehicleID = Number(req.params.vehicleID);
      const { type } = req.query;
      const { authorization } = req.headers;
      const token = jwt.verifyToken(`${authorization?.split(' ')[1]}`);

      if (typeof token === 'string' || !token || !token.hasOwnProperty('id')) {
        throw 'something was wrong';
      }

      if (!vehicleID) throw 'a vehicle id was not provided';
      if (!type) {
        throw 'query type transaction not provided';
      }
      if (type !== 'available' && type !== 'reserved' && type !== 'sold') {
        throw 'transaction type is invalid. Should be:  available, reserved or sold';
      }

      const updateStatusVehicle = await VehicleService(sequelize).update(
        { status: type },
        vehicleID
      );
      if (!updateStatusVehicle) throw 'Ops. This vehicle not exist';
      const response = await Employees_vehiclesService(sequelize).create({
        id_vehicle: vehicleID,
        id_employer: token.id,
      });

      res.status(200).json(response);
    } catch (err: any) {
      next(new Error(err));
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transaction = Number(req.params.id);
      if (!transaction) throw 'id was not provided';
      const response = await Employees_vehiclesService(sequelize).delete(
        transaction
      );

      if (!response) throw 'sale not deleted';

      res.status(200).send('sale deleted');
    } catch (err: any) {
      next(new Error(err));
    }
  },

  getMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.params.page);
      const employerID = Number(req.query.employer);
      if (!page) throw 'page was not provided';

      const response = await Employees_vehiclesService(sequelize).getMany(
        page,
        employerID
      );
      if (!response) throw 'sales not found';
      res.status(200).send(response);
    } catch (err: any) {
      next(new Error(err));
    }
  },
});
