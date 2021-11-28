import { DataTypes, Sequelize } from 'sequelize';
import { employees } from '../../types/entities/Employees';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmployeesModel } from '../../db/models/employees';

export const EmployeesService = (sequelize: Sequelize) => {
  const Employees = EmployeesModel(sequelize, DataTypes);

  return {
    create: async (Employer: employees): Promise<employees | void> => {
      try {
        const response = await Employees.create(Employer);
        return { ...response.get({ clone: true }), password: '' };
      } catch (err: any) {
        if (err.errors) {
          throw new Error(err.errors[0].message);
        } else {
          throw new Error(err);
        }
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
      if (!id) throw 'id was not provided';
      const response = await Employees.findByPk(id);
      if (!response) throw 'employer not found';
      const employer = response.get({ clone: true });
      return { ...employer, password: '' };
    },

    getOneByEmail: async (email: string): Promise<employees | void> => {
      if (!email) throw 'email was not provided';
      const response = await Employees.findOne({ where: { email } });
      if (!response) throw 'employer with this email not found';
      return response.get({ clone: true });
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
        if (!response) throw new Error('not found');
        return {
          count: response.count,
          employees: response.rows.map((employer) => ({
            ...employer.get({ clone: true }),
            password: '',
          })),
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
