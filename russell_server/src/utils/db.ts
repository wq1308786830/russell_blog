import * as Sequelize from 'sequelize';
import CONF from '../config';

export const sequelize = new Sequelize('russell', 'root', 'Wangqi:920828', {
// export const sequelize = new Sequelize('russell', 'root', 'wangqi', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+08:00',
  logging: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
