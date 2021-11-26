import { DataTypes, Sequelize } from 'sequelize';
import { employees } from '../../types/entities/Employees';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmployeesModel } from '../../models/employees';

export const EmployeesService = (sequelize: Sequelize) => {
  const Employees = EmployeesModel(sequelize, DataTypes);

  return {
    create: async (Employer: employees): Promise<employees | void> => {
      try {
        const response = await Employees.create(Employer);

        return response.get({ clone: true });
      } catch (err: any) {
        throw new Error(err.errors[0].message);
      }
    },
    delete: async (id: number): Promise<number> => {
      try {
        const response = await Employees.destroy({ where: { id } });

        return response;
      } catch (err: any) {
        throw new Error(err.errors[0].message);
      }
    },
    update: async (
      data: Partial<employees>,
      employerID: number
    ): Promise<number> => {
      try {
        const response = await Employees.update(data, {
          where: { id: employerID },
        });

        return response[0];
      } catch (err: any) {
        throw new Error(err.errors[0].message);
      }
    },
    getOne: async (id: number): Promise<employees | void> => {
      try {
        const response = await Employees.findByPk(id);

        if (!response) throw new Error('employer not found');

        return response.get({ clone: true });
      } catch (err: any) {
        throw new Error(err.errors[0].message);
      }
    },
    getMany: async (
      page: number
    ): Promise<{ count: number; employees: employees[] }> => {
      try {
        const ending = page * 10;
        const initial = ending - 10;
        const response = await Employees.findAndCountAll({
          offset: initial,
          limit: ending,
        });

        if (!response) throw new Error('employees not found');

        return {
          count: response.count,
          employees: response.rows.map((employer) =>
            employer.get({ clone: true })
          ),
        };
      } catch (err: any) {
        throw new Error(err.errors[0].message);
      }
    },
    deleteAll: async (): Promise<void> => {
      try {
        await Employees.destroy({ truncate: true, where: {} });
      } catch (err: any) {
        throw new Error(err);
      }
    },
  };
};
