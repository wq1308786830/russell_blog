import _fetch, {options} from "../utils/utils";

export default class BlogServices {

    getCategories(father_id) {
        options.body = JSON.stringify({father_id: father_id});
        return _fetch('/article/getCategories', options);
    }

    getAllCategories() {
        return _fetch('/article/getAllCategories', options);
    }

    getArticleList(key) {
        options.body = JSON.stringify({key: key});
        return _fetch('/article/getArticleList', options);
    }

    getArticleDetail(articleId) {
        options.body = JSON.stringify({articleId: articleId});
        return _fetch('/article/getArticleDetail', options);
    }

    getArticleRecommendLinks(articleId) {
        options.body = JSON.stringify({articleId: articleId});
        return _fetch('/article/getArticleRecommendLinks', options);
    }

    deleteCategory(categoryId) {
        options.body = JSON.stringify({categoryId: categoryId});
        return _fetch('/manage/deleteCategory', options);
    }
}
