import { Router } from 'express';
import EmployeesRoutes from './employees';

const router = Router();

router.use(EmployeesRoutes);

export default router;
