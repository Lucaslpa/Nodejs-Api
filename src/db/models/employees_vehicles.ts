import { Sequelize, DataTypes as dataTypes, Model } from 'sequelize';
import { employees_vehicle } from '../../types/entities/Employees_Vehicles';

export const Employees_VehicleModel = (
  sequelize: Sequelize,
  DataTypes: typeof dataTypes
) =>
  sequelize.define<Model<employees_vehicle>>('Employees_Vehicle', {
    id_employer: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Employees',
        key: 'id',
      },
    },
    id_vehicle: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Vehicles',
        key: 'id',
      },
    },
  });
