/* eslint-disable object-curly-newline */
import { Sequelize, DataTypes as dataTypes, Model, ModelCtor } from 'sequelize';
import { employees } from '../../types/entities/Employees';
import { Employees_VehicleModel } from './employess_vehicles';

export const EmployeesModel = (
  sequelize: Sequelize,
  DataTypes: typeof dataTypes
): ModelCtor<Model<employees>> => {
  const table = sequelize.define('Employees', {
    cpf: {
      type: DataTypes.STRING(11),
      validate: {
        max: 11,
        min: 11,
      },
    },
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        min: 5,
        max: 90,
        isEmail: true,
      },
    },
    avatar: DataTypes.STRING,
    biography: {
      type: DataTypes.STRING,
      validate: {
        min: 20,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: 8,
      },
    },
    role: DataTypes.STRING,
  });
  table.hasMany(Employees_VehicleModel(sequelize, DataTypes));
  return table;
};
