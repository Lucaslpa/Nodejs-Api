/* eslint-disable @typescript-eslint/indent */
import { DataTypes, Sequelize } from 'sequelize';
import { vehicle } from '../../types/entities/Vehicles';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { VehiclesModel } from '../../db/models/vehicles';

export const VehicleService = (sequelize: Sequelize) => {
  const Vehicles = VehiclesModel(sequelize, DataTypes);

  return {
    create: async (Vehicle: vehicle): Promise<vehicle | void> => {
      try {
        const response = await Vehicles.create(Vehicle);
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
        const response = await Vehicles.destroy({ where: { id } });
        return response;
      } catch (err: any) {
        throw new Error(err.errors[0].message);
      }
    },

    update: async (
      data: Partial<vehicle>,
      vehicleID: number
    ): Promise<number> => {
      try {
        const response = await Vehicles.update(data, {
          where: { id: vehicleID },
        });
        return response[0];
      } catch (err: any) {
        throw new Error(err.errors[0].message);
      }
    },

    getOne: async (id: number): Promise<vehicle | null> => {
      if (!id) throw 'id was not provided';
      const response = await Vehicles.findByPk(id);
      if (!response) return null;
      return response.get({ clone: true });
    },

    getMany: async (
      page: number,
      status?: string
    ): Promise<{ count: number; Vehicles: vehicle[] }> => {
      try {
        const ending = page * 10;
        const initial = ending - 10;
        const response = await Vehicles.findAndCountAll(
          status
            ? {
                offset: initial,
                limit: ending,
                where: {
                  status,
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
          Vehicles: response.rows.map((Vehicle) =>
            Vehicle.get({ clone: true })
          ),
        };
      } catch (err: any) {
        throw new Error(err.errors[0].message);
      }
    },

    deleteAll: async (): Promise<void> => {
      try {
        await Vehicles.destroy({ truncate: true, where: {} });
      } catch (err: any) {
        throw new Error(err);
      }
    },
  };
};
