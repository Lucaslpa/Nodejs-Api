import faker from 'faker';
import { Axios } from '../../axios';

function generateEmployer() {
  return {
    avatar: faker.image.avatar(),
    biography: faker.lorem.paragraph(40),
    cpf: faker.lorem.slug(11),
    email: faker.internet.email(),
    lastName: faker.name.lastName(),
    name: faker.name.firstName(),
    password: faker.lorem.word(11),
    role: 'administrator',
  };
}

describe('EmployeesRoute', () => {
  it('should return employer not found', async () => {
    const get = await Axios.get('/employer/1');
    expect(get.data.Error).toBe('employer not found');
  });
  it('should get a employer', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', { employer }, {});
    const get = await Axios.get(`/employer/${create.data.id}`);
    expect(get.data.id).toBe(create.data.id);
    await Axios.delete(`/employer/${create.data.id}`);
  });
  it('should create a employer', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', { employer }, {});
    expect(create.data.id).toBeTruthy();
    await Axios.delete(`/employer/${create.data.id}`);
    await Axios.delete(`/employer/${create.data.id}`);
  });

  it('should warning biography already in use', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', { employer }, {});
    const create2 = await Axios.post('/employer', { employer }, {});
    expect(create2.data.Error).toBe('biography already in use');
    await Axios.delete(`/employer/${create.data.id}`);
    await Axios.delete(`/employer/${create2.data.id}`);
  });

  it('should delete a employer', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', { employer }, {});
    const Delete = await Axios.delete(`/employer/${create.data.id}`);
    expect(Delete.status).toBe(200);
  });

  it('should update employer', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', { employer }, {});
    await Axios.put(`/employer/${create.data.id}`, {
      employer: { ...employer, email: 'joão@email.com' },
    });
    const get = await Axios.get(`/employer/${create.data.id}`);
    expect(get.data.email).not.toBe(create.data.email);
    await Axios.delete(`/employer/${create.data.id}`);
  });
});
