import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/db/data.sqlite3',
});

export const sequelizeTest = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/db/test.sqlite3',
});
