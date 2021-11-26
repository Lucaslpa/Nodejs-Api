/* eslint-disable no-plusplus */
import faker from 'faker';
import { employees } from '../../types/entities/Employees';
/* eslint-disable no-prototype-builtins */
import { sequelizeTest } from '../../db/connectDB';
import { EmployeesService } from '.';

const employeesService = EmployeesService(sequelizeTest);

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
  } as employees;
}

describe('EmployeesService', () => {
  it('should throw a error if try create a employer already existent ', async () => {
    const employer = generateEmployer();
    await employeesService.create(employer);

    await expect(employeesService.create(employer)).rejects.toThrowError(
      'biography must be unique'
    );
    await employeesService.deleteAll();
  });

  it('should create a employer ', async () => {
    const createdEmployer = await employeesService.create(generateEmployer());

    expect(createdEmployer?.id).toBeTruthy();

    await employeesService.deleteAll();
  });

  it('update a employer data', async () => {
    const createdEmployer = await employeesService.create(generateEmployer());
    if (
      createdEmployer &&
      createdEmployer.hasOwnProperty('id') &&
      typeof createdEmployer.id !== 'undefined'
    ) {
      const updateResponse = await employeesService.update(
        {
          email: 'novoemail@gmai.com',
          lastName: '32423',
        },
        createdEmployer.id
      );

      const updatedEmployer = await employeesService.getOne(createdEmployer.id);

      expect(updateResponse).toBe(1);
      expect(updatedEmployer?.email).not.toEqual(createdEmployer.email);
      expect(updatedEmployer?.lastName).not.toEqual(createdEmployer.lastName);
    }

    await employeesService.deleteAll();
  });

  it('should get a employer', async () => {
    const createdEmployer = await employeesService.create(generateEmployer());
    if (
      createdEmployer &&
      createdEmployer.hasOwnProperty('id') &&
      typeof createdEmployer.id !== 'undefined'
    ) {
      const employer = await employeesService.getOne(createdEmployer.id);

      expect(employer?.id).toBe(createdEmployer.id);
    }

    await employeesService.deleteAll();
  });

  it('should throw a error if try update employer with a data already existent ', async () => {
    const createdEmployer = await employeesService.create(generateEmployer());
    const anotherEmployer = await employeesService.create(generateEmployer());
    if (
      createdEmployer &&
      createdEmployer.hasOwnProperty('id') &&
      typeof createdEmployer.id !== 'undefined'
    ) {
      await expect(
        employeesService.update(
          { email: anotherEmployer?.email },
          createdEmployer.id
        )
      ).rejects.toThrowError('email must be unique');
    }

    await employeesService.deleteAll();
  });

  it('should throw a error if try create a employer with wrong email', async () => {
    await expect(
      employeesService.create({
        ...generateEmployer(),
        email: 'sasdsdd',
      })
    ).rejects.toThrowError('Validation isEmail on email failed');
  });

  it('should throw a error if try create a employer with wrong email', async () => {
    await expect(
      employeesService.create({
        ...generateEmployer(),
        email: 'sasdsdd',
      })
    ).rejects.toThrowError('Validation isEmail on email failed');
  });

  it('should get many employees', async () => {
    const generateEmployees = async () => {
      await employeesService.create(generateEmployer());
    };

    const getMany = async () => {
      const response = await employeesService.getMany(1);
      expect(response.count).toBe(13);
      expect(response.employees.length).toBe(10);
      await employeesService.deleteAll();
    };
    for (let i = 0; i < 13; i++) {
      generateEmployees();
      if (i === 12) {
        getMany();
      }
    }
  });
});
