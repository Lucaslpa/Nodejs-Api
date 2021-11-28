/* eslint-disable no-plusplus */
import faker from 'faker';
import { employees_vehicle } from '../../types/entities/Employees_Vehicles';
/* eslint-disable no-prototype-builtins */
import { sequelizeTest } from '../../db/connectDB';
import { Employees_vehiclesService } from '.';

const employees_vehiclesService = Employees_vehiclesService(sequelizeTest);

function generateEmployees_vehicles() {
  return {
    id_employer: faker.datatype.number(),
    id_vehicle: faker.datatype.number(),
  } as employees_vehicle;
}

describe('employees_employees_vehicles', () => {
  it('should create a employees_vehicles ', async () => {
    const createdVehicle = await employees_vehiclesService.create(
      generateEmployees_vehicles()
    );
    expect(createdVehicle?.id).toBeTruthy();
    await employees_vehiclesService.deleteAll();
  });

  it('should get a employees_vehicles', async () => {
    const createdVehicle = await employees_vehiclesService.create(
      generateEmployees_vehicles()
    );
    if (
      createdVehicle &&
      createdVehicle.hasOwnProperty('id') &&
      typeof createdVehicle.id !== 'undefined'
    ) {
      const Vehicle = await employees_vehiclesService.getOne(createdVehicle.id);
      expect(Vehicle?.id).toBe(createdVehicle.id);
    }
    await employees_vehiclesService.deleteAll();
  });

  it('should getOne employees_vehicles by vehicle', async () => {
    const vehicle1 = await employees_vehiclesService.create({
      ...generateEmployees_vehicles(),
      id_vehicle: 1,
    });
    const vehicle2 = await employees_vehiclesService.create({
      ...generateEmployees_vehicles(),
      id_vehicle: 2,
    });
    const resp1 = await employees_vehiclesService.getOneByVehicle(1);
    const resp2 = await employees_vehiclesService.getOneByVehicle(2);
    expect(resp2?.id).toBe(vehicle2?.id);
    expect(resp1?.id).toBe(vehicle1?.id);
    await employees_vehiclesService.deleteAll();
  });
});
