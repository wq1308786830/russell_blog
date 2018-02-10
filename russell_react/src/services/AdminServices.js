import _fetch, {options} from "../utils/utils";

function login(formData) {
    options.body = JSON.stringify(formData);
    return _fetch('/admin/login', options);
}

function getArticles(option, pageIndex) {
    options.body = JSON.stringify({option, pageIndex});
    return _fetch('/manage/getArticles', options);
}

function publishArticle(body) {
    options.body = JSON.stringify({body});
    return _fetch('/manage/publishArticle', options);
}

function changeArticle(body) {
    options.body = JSON.stringify({body});
    return _fetch('/manage/changeArticle', options);
}

function deleteArticle(id) {
    options.body = JSON.stringify({id});
    return _fetch('/manage/deleteArticle', options);
}

export default {login, getArticles, publishArticle, changeArticle, deleteArticle};