import { Router } from 'express';
import EmployeesRoutes from './employees';
import VehiclesRoutes from './vehicles';
import SalesRoutes from './Transactions';

const router = Router();

router.use(EmployeesRoutes);
router.use(VehiclesRoutes);
router.use(SalesRoutes);
export default router;
