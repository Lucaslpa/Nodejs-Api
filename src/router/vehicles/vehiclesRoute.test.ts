import faker from 'faker';
import { vehicle as VehicleType } from '../../types/entities/Vehicles';
/* eslint-disable no-prototype-builtins */
import { Axios } from '../../axios';

const UseToken = () => ({
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE2MzgwNjExNTd9.e1V_lek1nhBgQZc6qwx43glDv7UulVaX6ZTpW9gbXyI',
  },
});

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
  } as VehicleType;
}

describe('VehiclesRoute', () => {
  it('should return vehicle not found', async () => {
    const get = await Axios.get('/vehicle/1', UseToken());
    expect(get.data.Error).toBe('vehicle not found');
  });

  it('should create a vehicle', async () => {
    const vehicle = generateVehicle();
    const create = await Axios.post('/vehicle', { vehicle }, UseToken());
    expect(create.data.id).toBeTruthy();

    await Axios.delete(`/vehicle/${create.data.id}`, UseToken());
  });

  it('should delete a vehicle', async () => {
    const vehicle = generateVehicle();
    const create = await Axios.post(
      '/vehicle',
      {
        vehicle,
      },
      UseToken()
    );
    const Delete = await Axios.delete(`/vehicle/${create.data.id}`, UseToken());
    expect(Delete.status).toBe(200);
  });

  it('should update vehicle', async () => {
    const vehicle = generateVehicle();
    const create = await Axios.post(
      '/vehicle',
      {
        vehicle,
      },
      UseToken()
    );
    const update = await Axios.put(
      `/vehicle/${create.data.id}`,
      {
        vehicle: {
          brand: 'bela',
        },
      },
      UseToken()
    );
    expect(update.data).toBe('vehicle updated');
    await Axios.delete(`/vehicle/${create.data.id}`, UseToken());
  });

  it('should getMany vehicles', async () => {
    const create1 = await Axios.post(
      '/vehicle',
      {
        vehicle: generateVehicle(),
      },
      UseToken()
    );
    const create2 = await Axios.post(
      '/vehicle',
      {
        vehicle: generateVehicle(),
      },
      UseToken()
    );
    const create3 = await Axios.post(
      '/vehicle',
      {
        vehicle: generateVehicle(),
      },
      UseToken()
    );
    const getMany = await Axios.get('/vehicles/1', UseToken());
    expect(getMany.data.count).toBeGreaterThan(3);
    await Axios.delete(`/vehicle/${create1.data.id}`, UseToken());
    await Axios.delete(`/vehicle/${create2.data.id}`, UseToken());
    await Axios.delete(`/vehicle/${create3.data.id}`, UseToken());
  });
});
