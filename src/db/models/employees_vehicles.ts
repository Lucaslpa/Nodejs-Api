import { Sequelize, DataTypes as dataTypes, Model } from 'sequelize';
import { employees_vehicle } from '../../types/entities/Employees_Vehicles';
import { VehiclesModel } from './vehicles';

export const Employees_VehicleModel = (
  sequelize: Sequelize,
  DataTypes: typeof dataTypes
) => {
  const table = sequelize.define<Model<employees_vehicle>>(
    'Employees_Vehicle',
    {
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
    }
  );

  table.hasOne(VehiclesModel(sequelize, DataTypes), { foreignKey: 'id' });

  return table;
};
