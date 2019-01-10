/**
 * config file
 * @type {string | undefined}
 */

export const env = process.env.NODE_ENV;

export const domains = {
    foreignPrefix: 'http://104.156.250.95:7001',
    production: 'http://47.112.23.45:5001',
    development: 'http://localhost:5001'
};

const config = require(`./env/${(env.toLowerCase())}`).default;

export default Object.assign({env}, config, env);
