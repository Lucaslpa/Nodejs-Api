import { Router } from 'express';
import EmployeesRoutes from './employees';
import VehiclesRoutes from './vehicles';

const router = Router();

router.use(EmployeesRoutes);
router.use(VehiclesRoutes);

export default router;
