/**
 * DB & server configs
 * @type {{}}
 */
import common from "../common";
const DB = process.env.DB_RUSSELL_DEV
  ? JSON.parse(process.env.DB_RUSSELL_DEV)
  : {};

export default {
  VERSION: common.VERSION,
  PORT: common.PORT,

  HEAD_AUTH: {
    appId: "",
    appKey: ""
  },

  DB_CONF: {
    user: DB.USER || "root",
    password: DB.PWD || "Wangqi:920828",
    host: DB.HOST || "127.0.0.1",
    port: DB.PORT || 3306,
    database: DB.DB || "russell",
    ssl: false,
    max: 20,
    min: 4,
    idleTimeoutMillis: 1000
  }
};
