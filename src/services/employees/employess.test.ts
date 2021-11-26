import { sequelizeTest } from '../../db/connectDB';
import { EmployeesController } from '.';
import { employees } from '../../types/entities/Employees';

const employeesController = EmployeesController(sequelizeTest);

const EmployerMock = {
  avatar: 'algum avatar',
  biography: 'alguma biografia',
  cpf: '123456789101111111',
  email: 'algum@gmail.com',
  lastName: 'primeiroNome',
  name: 'nome',
  password: '12345',
  role: 'administrator',
} as employees;

describe('EmployeesController', () => {
  it('should throw a error if employer already exist in database ', async () => {
    await employeesController.create(EmployerMock);

    await expect(employeesController.create(EmployerMock)).rejects.toThrowError(
      'unique violation'
    );
    await employeesController.delete(EmployerMock.email);
  });

  it('should create a employer ', async () => {
    const response = await employeesController.create(EmployerMock);

    expect(response?.cpf).toBeTruthy();
  });
});
