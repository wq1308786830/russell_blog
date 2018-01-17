// import * as Sequelize from 'sequelize';
// import CONF from '../config';
//
// var sequelize = new Sequelize(CONF.PG_CONF.database,CONF.PG_CONF.user, CONF.PG_CONF.password, {
//     host: CONF.PG_CONF.host,
//     port:CONF.PG_CONF.port,
//     dialect: 'mysql',
//
//     pool: {
//         max: CONF.PG_CONF.max,
//         min: CONF.PG_CONF.min,
//         idle: CONF.PG_CONF.idleTimeoutMillis
//     },
//
//     // SQLite only
//     // storage: 'path/to/database.sqlite'
// });
//
// export default {
//     ORM:sequelize,
//     ORM_TYPE:Sequelize
// }


import * as Knex from 'knex';

import CONF from '../config';
const knex = Knex({
    client: 'mysql',
    connection: {
        host: CONF.PG_CONF.host,
        user: CONF.PG_CONF.user,
        password: CONF.PG_CONF.password,
        database: CONF.PG_CONF.database,
        debug: true
    },
    pool: {
        min: CONF.PG_CONF.min,
        max: CONF.PG_CONF.max,
    },
    acquireConnectionTimeout: 10000
});

export default knex;