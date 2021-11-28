/* eslint-disable @typescript-eslint/indent */
import { DataTypes, Sequelize } from 'sequelize';
import { employees_vehicle } from '../../types/entities/Employees_Vehicles';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Employees_VehicleModel } from '../../db/models/employees_vehicles';

export const Employees_vehiclesService = (sequelize: Sequelize) => {
  const Employees_Vehicle = Employees_VehicleModel(sequelize, DataTypes);

  return {
    create: async (
      Vehicle: employees_vehicle
    ): Promise<employees_vehicle | void> => {
      try {
        const response = await Employees_Vehicle.create(Vehicle);
        return response.get({ clone: true });
      } catch (err: any) {
        if (err.errors[0]) {
          throw new Error(err.errors[0].message);
        } else {
          throw new Error(err);
        }
      }
    },

    delete: async (id: number): Promise<number> => {
      try {
        const response = await Employees_Vehicle.destroy({ where: { id } });
        return response;
      } catch (err: any) {
        throw new Error(err.errors[0].message);
      }
    },

    getOne: async (id: number): Promise<employees_vehicle | void> => {
      if (!id) throw 'id was not provided';
      const response = await Employees_Vehicle.findByPk(id);
      if (!response) throw 'sale not found';
      return response.get({ clone: true });
    },

    getOneByVehicle: async (id: number): Promise<employees_vehicle | void> => {
      if (!id) throw 'id was not provided';
      const response = await Employees_Vehicle.findOne({
        where: { id_vehicle: id },
      });
      if (!response) throw 'sale not found';
      return response.get({ clone: true });
    },

    getMany: async (
      page: number,
      employerID?: number
    ): Promise<{ count: number; Employees_Vehicle: employees_vehicle[] }> => {
      try {
        const ending = page * 10;
        const initial = ending - 10;
        const response = await Employees_Vehicle.findAndCountAll(
          employerID
            ? {
                offset: initial,
                limit: ending,
                where: {
                  id_employer: employerID,
                },
              }
            : {
                offset: initial,
                limit: ending,
              }
        );
        if (!response) throw new Error('not found');
        return {
          count: response.count,
          Employees_Vehicle: response.rows.map((Vehicle) =>
            Vehicle.get({ clone: true })
          ),
        };
      } catch (err: any) {
        throw new Error(err);
      }
    },

    deleteAll: async (): Promise<void> => {
      try {
        await Employees_Vehicle.destroy({ truncate: true, where: {} });
      } catch (err: any) {
        throw new Error(err);
      }
    },
  };
};
