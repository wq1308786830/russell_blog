import * as Sequelize from 'sequelize';
import config from '../config';

export const sequelize = new Sequelize(config.DB_CONF.database, config.DB_CONF.user, config.DB_CONF.password, {
// export const sequelize = new Sequelize('russell', 'root', 'wangqi', {
  host: config.DB_CONF.host,
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
