export const env = process.env.NODE_ENV;

export const Config = {
  foreignPrefix: 'http://104.156.250.95:7001/1.0',
  production: 'http://47.112.23.45:5001/1.0',
  development: 'http://localhost:5001/1.0'
};

console.log(env);

export const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  cache: 'default',
  body: null
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function _fetch(url, options) {
  let prefix = Config[env];

  return fetch(prefix + url, options)
    .then(checkStatus)
    .then(response => response.json())
    .catch(err => {
      throw err;
    });
}
