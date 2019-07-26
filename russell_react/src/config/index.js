export const env = process.env.NODE_ENV;

export const Config = {
  foreignPrefix: 'http://104.156.250.95:7001/1.0',
  production: 'http://47.112.23.45:5001/1.0',
  development: 'http://localhost:5001/1.0'
};

window.console.log(env);
