import { Router } from 'express';

const router = Router();

router.get(
  '/error',
  (req, res, next) => {
    try {
      next();
    } catch (err) {
      res.status(200).json({ err });
    }
  },
  async (req, res, next) => {
    console.log('passow sem erros');
    next();
  },
  async () => {
    throw new Error('Alguma coisa errada');
  }
);

export default router;
