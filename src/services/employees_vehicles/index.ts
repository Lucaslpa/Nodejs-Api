import { DataTypes, Sequelize } from 'sequelize';
/* eslint-disable @typescript-eslint/indent */
import { employees_vehicle } from '../../types/entities/Employees_Vehicles';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Employees_VehicleModel } from '../../db/models/employees_vehicles';
import { VehiclesModel } from '../../db/models/vehicles';
import { EmployeesService } from '../employees';

export const Employees_vehiclesService = (sequelize: Sequelize) => {
  const Employees_Vehicle = Employees_VehicleModel(sequelize, DataTypes);
  const vehicles = VehiclesModel(sequelize, DataTypes);
  const employees = EmployeesService(sequelize);
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

    getAllTransactionsByEmployer: async (id: number) => {
      const response = await Employees_Vehicle.findAll({
        where: { id_employer: id },
      });

      if (!response) return [];
      const transactions = response.map((item) => item.get({ clone: true }));
      const res = Promise.all(
        transactions.map((item) => vehicles.findByPk(item.id_vehicle))
      );
      return (await res).map((item) => item?.get({ clone: true }));
    },

    getOneByVehicle: async (id: number): Promise<employees_vehicle | void> => {
      if (!id) throw 'id was not provided';
      const response = await Employees_Vehicle.findOne({
        where: { id_vehicle: id },
      });
      if (!response) throw 'sale not found';
      return response.get({ clone: true });
    },

    getMany: async (page: number, employerID?: number) => {
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
        ).then((res) => ({
          count: res.count,
          transactions: res.rows.map((item) => item.get({ clone: true })),
        }));

        const transactions = await Promise.all(
          response.transactions.map(async (item) => ({
            ...item,
            seller: await employees.getOne(item.id_employer),
            vehicle: await vehicles
              .findByPk(item.id_vehicle)
              .then((res) => res?.get({ clone: true })),
          }))
        );

        if (!transactions) return [];
        return [...transactions];
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
