export const Config = {
    prefix: 'http://104.156.250.95:5000/1.0',
};

export const options = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    cache: 'default',
    body: null
};

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export default function _fetch(url, options) {
    return fetch(Config.prefix + url, options)
        .then(checkStatus)
        .then(response => response.json())
        .catch(err => {throw(err)});
}