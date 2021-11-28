import { Request, Response, NextFunction } from 'express';
import { Error } from 'sequelize/dist';
import { EmployeesService } from '../../services/employees';
import { sequelize } from '../../db/connectDB';
import { BCRYPT } from '../../utils/bcrypt';
import { JWT } from '../../utils/jwt/Jwt';

const bcrypt = new BCRYPT();
const jwt = new JWT();
export const EmployeesController = () => ({
  authenticate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email) throw 'email was not provided';
      if (!password) throw 'password was not provided';
      const employer = await EmployeesService(sequelize).getOneByEmail(email);
      if (!employer) throw 'employer with this email not found';
      const passwordIsEqual = await bcrypt.compare(password, employer.password);
      if (!passwordIsEqual) throw 'invalid password';
      const token = jwt.generateToken({ id: employer.id, role: employer.role });
      res.status(200).json({ token });
    } catch (err: any) {
      next(new Error(err));
    }
  },

  getEmployer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employerID = Number(req.params.id);
      if (!employerID) throw 'id was not provided';
      const employer = await EmployeesService(sequelize).getOne(employerID);
      res.status(200).json(employer);
    } catch (err: any) {
      next(new Error(err));
    }
  },

  createEmployer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employer } = req.body;
      if (!employer) throw 'employer was not provided';
      const encryptedPassword = await bcrypt.encrypt(employer.password);
      const createdEmployer = await EmployeesService(sequelize).create({
        ...employer,
        password: encryptedPassword,
      });
      res.status(200).json(createdEmployer);
    } catch (err: any) {
      next(new Error(err));
    }
  },

  deleteEmployer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employerID = Number(req.params.id);
      if (!employerID) throw 'id was not provided';
      const response = await EmployeesService(sequelize).delete(employerID);

      if (!response) throw 'employer not deleted';

      res.status(200).send('employer deleted');
    } catch (err: any) {
      next(new Error(err));
    }
  },

  updateEmployer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employerID = Number(req.params.id);
      const employerData = req.body.employer;
      if (!employerID) throw 'id was not provided';
      const response = await EmployeesService(sequelize).update(
        employerData,
        employerID
      );
      if (!response) throw 'employer not updated';
      res.status(200).send('employer updated');
    } catch (err: any) {
      next(new Error(err));
    }
  },

  getManyEmployees: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.params.page);

      if (!page) throw 'page was not provided';
      const response = await EmployeesService(sequelize).getMany(page);
      if (!response) throw 'employees not found';
      res.status(200).send(response);
    } catch (err: any) {
      next(new Error(err));
    }
  },
});
