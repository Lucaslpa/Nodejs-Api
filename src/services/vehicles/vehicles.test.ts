/* eslint-disable no-plusplus */
import faker from 'faker';
import { vehicle } from '../../types/entities/Vehicles';
/* eslint-disable no-prototype-builtins */
import { sequelizeTest } from '../../db/connectDB';
import { VehicleService } from '.';

const vehicleService = VehicleService(sequelizeTest);

function generateVehicle() {
  return {
    brand: faker.company.companyName(),
    chassi: faker.lorem.word(),
    color: faker.vehicle.color(),
    km: faker.datatype.number(200),
    model: faker.vehicle.model(),
    price: faker.datatype.number({
      min: 20000,
      max: 60000,
    }),
    status: 'available',
    year: `${faker.datatype.number({
      min: 2000,
      max: 2021,
    })}`,
  } as vehicle;
}

describe('VehicleService', () => {
  it('should create a vehicle ', async () => {
    const createdVehicle = await vehicleService.create(generateVehicle());
    expect(createdVehicle?.id).toBeTruthy();
    await vehicleService.deleteAll();
  });

  it('update a vehicle data', async () => {
    const createdVehicle = await vehicleService.create(generateVehicle());
    if (
      createdVehicle &&
      createdVehicle.hasOwnProperty('id') &&
      typeof createdVehicle.id !== 'undefined'
    ) {
      const updateResponse = await vehicleService.update(
        {
          status: 'reserved',
        },
        createdVehicle.id
      );
      const updatedVehicle = await vehicleService.getOne(createdVehicle.id);
      expect(updateResponse).toBe(1);
      expect(updatedVehicle?.status).not.toEqual(createdVehicle.status);
    }
    await vehicleService.deleteAll();
  });

  it('should get a vehicle', async () => {
    const createdVehicle = await vehicleService.create(generateVehicle());
    if (
      createdVehicle &&
      createdVehicle.hasOwnProperty('id') &&
      typeof createdVehicle.id !== 'undefined'
    ) {
      const Vehicle = await vehicleService.getOne(createdVehicle.id);
      expect(Vehicle?.id).toBe(createdVehicle.id);
    }
    await vehicleService.deleteAll();
  });

  it('should get a vehicle by status', async () => {
    await vehicleService.create(generateVehicle());
    await vehicleService.create(generateVehicle());
    const createdVehicle3 = await vehicleService.create({
      ...generateVehicle(),
      status: 'sold',
    });
    const sold = await vehicleService.getMany(1, 'sold');
    const available = await vehicleService.getMany(1, 'available');

    expect(sold.count).toBe(1);
    expect(available.count).toBe(2);
    expect(sold.Vehicles[0].id).toBe(createdVehicle3?.id);
    await vehicleService.deleteAll();
  });

  it('should get many Vehicles', async () => {
    await vehicleService.create(generateVehicle());
    await vehicleService.create(generateVehicle());
    await vehicleService.create(generateVehicle());
    await vehicleService.create(generateVehicle());
    await vehicleService.create(generateVehicle());

    const response = await vehicleService.getMany(1);
    expect(response.Vehicles.length).toBe(5);
    await vehicleService.deleteAll();
  });
});
