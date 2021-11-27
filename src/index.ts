import express from 'express';
import cors from 'cors';
import router from './router';
import { errorHandler } from './middlewares/errorHandler';

require('dotenv').config();

const App = express();
App.use(cors({ origin: [`${process.env.CLIENT_ALLOW_CORS}`] }));
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(router);
App.use(errorHandler);

const PORT = process.env.PORT || 2000;
App.listen(PORT, () => {
  console.log(`rodando na porta: ${PORT}`);
});
