import { Sequelize, DataTypes as dataTypes, Model } from 'sequelize';
import { vehicle } from '../../types/entities/Vehicles';
import { Employees_VehicleModel } from './employess_vehicles';

export const VehiclesModel = (
  sequelize: Sequelize,
  DataTypes: typeof dataTypes
) => {
  const table = sequelize.define<Model<vehicle>>('Vehicles', {
    price: DataTypes.FLOAT(8, 2),
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.STRING,
    status: DataTypes.STRING,
    color: DataTypes.STRING,
    chassi: DataTypes.STRING,
    km: DataTypes.NUMBER,
  });

  table.hasOne(Employees_VehicleModel(sequelize, DataTypes));

  return table;
};
