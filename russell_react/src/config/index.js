const env = process.env.NODE_ENV;

const Config = {
  foreignPrefix: 'http://104.156.250.95:7001',
  production: 'http://47.112.23.45:5001',
  development: 'http://localhost:5001'
};

const prefix = Config[env];

window.console.log(env);

export default {
  env,
  Config,
  prefix
};
