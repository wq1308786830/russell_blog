export const env = process.env.NODE_ENV;

export const Config = {
  foreignPrefix: 'http://104.156.250.95:7001/1.0',
  production: 'http://47.112.23.45:5001/1.0',
  development: 'http://localhost:5001/1.0',
};

console.log(env);

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, params, method = 'GET') {
  const prefix = Config[env];
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    cache: 'default',
    method,
  };

  if (method === 'POST') {
    options.body = params;
  }

  return fetch(prefix + url, options)
    .then(checkStatus)
    .then(response => response.json())
    .catch(err => {
      throw err;
    });
}
