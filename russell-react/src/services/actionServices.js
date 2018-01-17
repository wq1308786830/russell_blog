import {history} from "../_helpers";
import Config from "../utils/config";

export const actionServices = {
    login
};

function login(formData) {
    fetch(Config.prefix + '/common/login', {
        method: 'POST',
        headers: Config.headers,
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(resp => {
            if (resp.success) {
                localStorage.setItem('user', '1');
                history.push('/admin');
            }
        })
        .catch(e => {
            console.log(e);
        });
}
