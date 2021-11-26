/* eslint-disable object-curly-newline */
import { Sequelize, DataTypes as dataTypes, Model, ModelCtor } from 'sequelize';
import { employees } from '../types/entities/Employees';
import { Employees_VehicleModel } from './employess_vehicles';

export const EmployeesModel = (
  sequelize: Sequelize,
  DataTypes: typeof dataTypes
): ModelCtor<Model<employees>> => {
  const table = sequelize.define('Employees', {
    cpf: DataTypes.STRING(11),
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    biography: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  });
  table.hasMany(Employees_VehicleModel(sequelize, DataTypes));
  return table;
};
