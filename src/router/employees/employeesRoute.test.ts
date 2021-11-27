/* eslint-disable no-prototype-builtins */
import faker from 'faker';
import { Axios } from '../../axios';
import { JWT } from '../../utils/jwt/Jwt';

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

const jwt = new JWT();

describe('EmployeesRoute', () => {
  it('should return employer not found', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', {
      employer,
    });
    const login = await Axios.post('/authenticate', {
      email: employer.email,
      password: employer.password,
    });
    const get = await Axios.get(`/employer/${create.data.id + 1}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
    expect(get.data.Error).toBe('employer not found');
    await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
  });
  it('should get a employer', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', { employer }, {});
    const login = await Axios.post('/authenticate', {
      email: employer.email,
      password: employer.password,
    });
    const get = await Axios.get(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
    expect(get.data.id).toBe(create.data.id);

    await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
  });

  it('should create a employer', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', { employer }, {});
    const login = await Axios.post('/authenticate', {
      email: employer.email,
      password: employer.password,
    });
    expect(create.data.id).toBeTruthy();

    await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
  });

  it('password should be encrypted', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', { employer }, {});
    const login = await Axios.post('/authenticate', {
      email: employer.email,
      password: employer.password,
    });
    expect(create.data.password).not.toBe(employer.password);

    await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
  });

  it('should warning biography already in use', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', { employer });
    const create2 = await Axios.post('/employer', { employer });
    const login = await Axios.post('/authenticate', {
      email: employer.email,
      password: employer.password,
    });
    expect(create2.data.Error).toBe('biography already in use');
    await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
    await Axios.delete(`/employer/${create2.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
  });

  it('should delete a employer', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', {
      employer,
    });
    const login = await Axios.post('/authenticate', {
      email: employer.email,
      password: employer.password,
    });
    const Delete = await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
    expect(Delete.status).toBe(200);
  });

  it('should update employer', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', { employer }, {});
    const login = await Axios.post('/authenticate', {
      email: employer.email,
      password: employer.password,
    });
    await Axios.put(
      `/employer/${create.data.id}`,
      {
        employer: { ...employer, email: 'joão@email.com' },
      },
      {
        headers: {
          authorization: `Bearer ${login.data.token}`,
        },
      }
    );
    const get = await Axios.get(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
    expect(get.data.email).not.toBe(create.data.email);
    await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
  });

  it('should get many employees', async () => {
    const employer = generateEmployer();
    const employer2 = generateEmployer();
    const create = await Axios.post('/employer', {
      employer,
    });
    const create2 = await Axios.post('/employer', {
      employer: employer2,
    });

    const login = await Axios.post('/authenticate', {
      email: employer.email,
      password: employer.password,
    });
    const getMany = await Axios.get('/employees/1', {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
    expect(getMany.data.count).toBe(2);
    expect(getMany.data.employees[0].id).toBe(create.data.id);
    expect(getMany.data.employees[1].id).toBe(create2.data.id);
    await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
    await Axios.delete(`/employer/${create2.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
  });

  it('should authenticate', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', {
      employer,
    });
    const login = await Axios.post('/authenticate', {
      email: create.data.email,
      password: employer.password,
    });
    const jwtEmployer = jwt.verifyToken(login.data.token);
    if (typeof jwtEmployer !== 'string' && jwtEmployer) {
      expect(create.data.id).toBe(jwtEmployer.id);
      expect(create.data.role).toBe('administrator');
    }
    await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
  });

  it('should unauthorize when password is incorrect', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', {
      employer,
    });
    const loginValid = await Axios.post('/authenticate', {
      email: create.data.email,
      password: employer.password,
    });
    const login = await Axios.post('/authenticate', {
      email: create.data.email,
      password: 'wrongPassword',
    });
    expect(login.status).toBe(401);
    expect(login.data.Error).toBe('invalid password');
    await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${loginValid.data.token}`,
      },
    });
  });

  it('should warning employer not exist', async () => {
    const login = await Axios.post('/authenticate', {
      email: 'random@email.com',
      password: 'Password',
    });
    expect(login.status).toBe(404);
    expect(login.data.Error).toBe('employer with this email not found');
  });

  it('should should unauthorize if has no a valid token', async () => {
    const get = await Axios.get('/employer/1');
    expect(get.status).toBe(401);
    expect(get.data.Error).toBe('Unauthorized');
  });

  it('should should forbidden sellers to delete', async () => {
    const employer = generateEmployer();
    const create = await Axios.post('/employer', {
      employer: { ...employer, role: 'seller' },
    });
    const login = await Axios.post('/authenticate', {
      email: employer.email,
      password: employer.password,
    });
    const adm = generateEmployer();
    const createAdm = await Axios.post('/employer', {
      employer: adm,
    });
    const loginAdm = await Axios.post('/authenticate', {
      email: adm.email,
      password: adm.password,
    });
    const Delete = await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${login.data.token}`,
      },
    });
    expect(Delete.data.Error).toBe('you are not a administrator');

    await Axios.delete(`/employer/${create.data.id}`, {
      headers: {
        authorization: `Bearer ${loginAdm.data.token}`,
      },
    });
    await Axios.delete(`/employer/${createAdm.data.id}`, {
      headers: {
        authorization: `Bearer ${loginAdm.data.token}`,
      },
    });
  });
});
