import _fetch, {options} from "../utils/utils";

export const blogServices = {
    getCategories,
    getAllCategories,
    getArticleListByKey,
    getArticleDetail,
    getArticleRecommendLinks,
};


function getCategories(father_id) {
    options.body = JSON.stringify({father_id: father_id});
    return _fetch('/article/getCategories', options);
}

function getAllCategories() {
    return _fetch('/article/getAllCategories', options);
}

function getArticleListByKey(key) {
    options.body = JSON.stringify({key: key});
    return _fetch('/article/getArticleListByKey', options);
}

function getArticleDetail(articleId) {
    options.body = JSON.stringify({articleId: articleId});
    return _fetch('/article/getArticleDetail', options);
}

function getArticleRecommendLinks(articleId) {
    options.body = JSON.stringify({articleId: articleId});
    return _fetch('/article/getArticleRecommendLinks', options);
}

