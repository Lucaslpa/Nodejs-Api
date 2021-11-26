import { DataTypes, Sequelize } from 'sequelize';
import { EmployeesModel } from '../../models/employees';
import { employees } from '../../types/entities/Employees';

export const EmployeesController = (sequelize: Sequelize) => {
  const Employees = EmployeesModel(sequelize, DataTypes);

  return {
    create: async (Employer: employees): Promise<employees | void> => {
      try {
        const response = await Employees.create(Employer);

        return response.get({ clone: true });
      } catch (err: any) {
        throw new Error(err.errors[0].type);
      }
    },
    delete: async (email: string): Promise<any> => {
      try {
        const response = await Employees.destroy({ where: { email } });

        return response;
      } catch (err: any) {
        throw new Error(err.errors[0].type);
      }
    },
  };
};
