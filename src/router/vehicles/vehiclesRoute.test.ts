import faker from 'faker';
import { vehicle as VehicleType } from '../../types/entities/Vehicles';
/* eslint-disable no-prototype-builtins */
import { Axios } from '../../axios';

const employer = {
  avatar: faker.image.avatar(),
  biography: faker.lorem.paragraph(40),
  cpf: faker.datatype.string(11),
  email: faker.internet.email(),
  lastName: faker.name.lastName(),
  name: faker.name.firstName(),
  password: faker.lorem.word(11),
  role: 'administrator',
};

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

let token: string;
let id: any;

const UseToken = () => ({
  headers: {
    authorization: `Bearer ${token}`,
  },
});

describe('VehiclesRoute', () => {
  beforeAll(async () => {
    const create = await Axios.post('/employer', { employer });
    const login = await Axios.post('/login', {
      email: employer.email,
      password: employer.password,
    });
    token = login.data.token;
    id = create.data.id;
  });

  afterAll(async () => {
    await Axios.delete(`/employer/${id}`, {});
  });

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
    expect(getMany.data.count).toBeGreaterThan(2);
    await Axios.delete(`/vehicle/${create1.data.id}`, UseToken());
    await Axios.delete(`/vehicle/${create2.data.id}`, UseToken());
    await Axios.delete(`/vehicle/${create3.data.id}`, UseToken());
  });
});
