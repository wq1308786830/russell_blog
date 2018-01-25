import _fetch, {options} from "../utils/utils";

export const actionServices = {
    login
};

function login(formData) {
    options.body = JSON.stringify(formData);
    return _fetch('/common/login', options);
}
