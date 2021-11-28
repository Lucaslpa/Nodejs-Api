import { Router } from 'express';
import { EmployeesSalesVehiclesController } from '../../controller/employerSellVehicles';
import { VerifyAuthentication } from '../../middlewares/validates';

const employeesSalesVehiclesRoute = Router();

const employeesSalesVehiclesController = EmployeesSalesVehiclesController();

employeesSalesVehiclesRoute.get(
  '/transaction/:id',
  VerifyAuthentication,
  employeesSalesVehiclesController.get
);

employeesSalesVehiclesRoute.post(
  '/transaction/:vehicleID',
  VerifyAuthentication,
  employeesSalesVehiclesController.create
);

employeesSalesVehiclesRoute.delete(
  '/transaction/:id',
  VerifyAuthentication,

  employeesSalesVehiclesController.delete
);

employeesSalesVehiclesRoute.get(
  '/transactions/:page',
  VerifyAuthentication,
  employeesSalesVehiclesController.getMany
);

export default employeesSalesVehiclesRoute;
