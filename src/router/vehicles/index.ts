import { Router } from 'express';
import { VehicleController } from '../../controller/vehicles';
import {
  VerifyAuthentication,
  verifyAdministrator,
} from '../../middlewares/validates';

const VehiclesRoute = Router();

const employeesController = VehicleController();

VehiclesRoute.get(
  '/vehicle/:id',
  VerifyAuthentication,
  employeesController.getVehicle
);
VehiclesRoute.post('/vehicle', employeesController.createVehicle);

VehiclesRoute.delete(
  '/vehicle/:id',
  VerifyAuthentication,
  verifyAdministrator,
  employeesController.deleteVehicle
);
VehiclesRoute.put(
  '/vehicle/:id',
  VerifyAuthentication,
  verifyAdministrator,
  employeesController.updateVehicle
);
VehiclesRoute.get(
  '/vehicles/:page',
  VerifyAuthentication,
  employeesController.getManyVehicles
);

export default VehiclesRoute;
