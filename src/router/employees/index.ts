import { Router } from 'express';
import { EmployeesController } from '../../controller/employees';
import {
  VerifyAuthentication,
  verifyAdministrator,
} from '../../middlewares/validates';

const EmployeesRoutes = Router();

const employeesController = EmployeesController();

EmployeesRoutes.get(
  '/employer/:id',
  VerifyAuthentication,
  employeesController.getEmployer
);
EmployeesRoutes.post('/employer', employeesController.createEmployer);
EmployeesRoutes.delete(
  '/employer/:id',
  VerifyAuthentication,
  verifyAdministrator,
  employeesController.deleteEmployer
);
EmployeesRoutes.put(
  '/employer/:id',
  VerifyAuthentication,
  verifyAdministrator,
  employeesController.updateEmployer
);
EmployeesRoutes.get(
  '/employees/:page',
  VerifyAuthentication,
  employeesController.getManyEmployees
);
EmployeesRoutes.post('/authenticate', employeesController.authenticate);

export default EmployeesRoutes;
