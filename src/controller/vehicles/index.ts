import { Request, Response, NextFunction } from 'express';
import { Error } from 'sequelize/dist';
import { VehicleService } from '../../services/vehicles';
import { sequelize } from '../../db/connectDB';
import { vehicle as vehicleType } from '../../types/entities/Vehicles';

export const VehicleController = () => ({
  getVehicle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vehicleID = Number(req.params.id);
      if (!vehicleID) throw 'id was not provided';
      const vehicle = await VehicleService(sequelize).getOne(vehicleID);
      if (!vehicle) throw 'vehicle not found';
      res.status(200).json(vehicle);
    } catch (err: any) {
      next(new Error(err));
    }
  },

  createVehicle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { vehicle } = req.body as { vehicle: vehicleType };
      if (!vehicle) throw 'vehicle was not provided';

      const createdVehicle = await VehicleService(sequelize).create({
        ...vehicle,
        status: 'available',
      });
      res.status(200).json(createdVehicle);
    } catch (err: any) {
      next(err);
    }
  },

  deleteVehicle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vehicleID = Number(req.params.id);
      if (!vehicleID) throw 'id was not provided';
      const response = await VehicleService(sequelize).delete(vehicleID);

      if (!response) throw 'vehicle not deleted';

      res.status(200).send('vehicle deleted');
    } catch (err: any) {
      next(new Error(err));
    }
  },

  updateVehicle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vehicleID = Number(req.params.id);
      const vehicleData = req.body.vehicle;
      if (!vehicleID) throw 'id was not provided';
      const response = await VehicleService(sequelize).update(
        vehicleData,
        vehicleID
      );
      if (!response) throw 'vehicle not updated';
      res.status(200).send('vehicle updated');
    } catch (err: any) {
      next(new Error(err));
    }
  },

  getManyVehicles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.params.page);
      const { status } = req.query;
      if (!page) throw 'page was not provided';
      if (
        status &&
        status !== 'available' &&
        status !== 'reserved' &&
        status !== 'sold'
      ) {
        throw 'wrong status search. Try: available, reserved or sold';
      }

      const response = await VehicleService(sequelize).getMany(
        page,
        status || ''
      );
      if (!response) throw 'vehicles not found';
      res.status(200).send(response);
    } catch (err: any) {
      next(new Error(err));
    }
  },
});
