import { Router } from 'express';
import { EmployeesController } from '../../controller/employees';

const EmployeesRoutes = Router();

const employeesController = EmployeesController();

EmployeesRoutes.get('/employer/:id', employeesController.getEmployer);
EmployeesRoutes.post('/employer', employeesController.createEmployer);
EmployeesRoutes.delete('/employer/:id', employeesController.deleteEmployer);
EmployeesRoutes.put('/employer/:id', employeesController.updateEmployer);

export default EmployeesRoutes;
