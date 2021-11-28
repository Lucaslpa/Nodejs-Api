import faker from 'faker';
import { employees_vehicle } from '../../types/entities/Employees_Vehicles';
/* eslint-disable no-prototype-builtins */
import { Axios } from '../../axios';

const UseToken = () => ({
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE2MzgwNjExNTd9.e1V_lek1nhBgQZc6qwx43glDv7UulVaX6ZTpW9gbXyI',
  },
});

function generateSales() {
  return {
    id_employer: faker.datatype.number(),
    id_vehicle: faker.datatype.number(),
  } as employees_vehicle;
}

describe('TransactionsRoute', () => {
  it('should return sale not found', async () => {
    const get = await Axios.get('/sale/1', UseToken());

    expect(get.data.Error).toBe('sale not found');
  });

  it('should create a sale', async () => {
    const sale = generateSales();
    const create = await Axios.post('/sale', { sale }, UseToken());

    expect(create.data.id).toBeTruthy();

    await Axios.delete(`/sale/${create.data.id}`, UseToken());
  });

  it('should delete a sale', async () => {
    const sale = generateSales();
    const create = await Axios.post(
      '/sale',
      {
        sale,
      },
      UseToken()
    );

    const Delete = await Axios.delete(`/sale/${create.data.id}`, UseToken());

    expect(Delete.status).toBe(200);
  });

  it('should getMany sales', async () => {
    const create1 = await Axios.post(
      '/sale',
      {
        sale: generateSales(),
      },
      UseToken()
    );
    const create2 = await Axios.post(
      '/sale',
      {
        sale: generateSales(),
      },
      UseToken()
    );
    const create3 = await Axios.post(
      '/sale',
      {
        sale: generateSales(),
      },
      UseToken()
    );
    const getMany = await Axios.get('/sales/1', UseToken());
    expect(getMany.data.count).toBe(3);
    await Axios.delete(`/sale/${create1.data.id}`, UseToken());
    await Axios.delete(`/sale/${create2.data.id}`, UseToken());
    await Axios.delete(`/sale/${create3.data.id}`, UseToken());
  });
});
