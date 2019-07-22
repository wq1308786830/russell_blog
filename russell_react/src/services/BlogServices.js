import request, { options } from '../utils/utils';

export default class BlogServices {
  constructor() {
    this.fetch = request;
  }

  getCategories(fatherId) {
    options.body = JSON.stringify({ fatherId });
    return this.fetch('/category/getCategories', options);
  }

  getAllCategories() {
    return this.fetch('/category/getAllCategories');
  }

  getArticleList(key) {
    options.body = JSON.stringify({ key });
    return this.fetch('/article/getArticleList', options);
  }

  getArticleDetail(articleId) {
    options.body = JSON.stringify({ articleId });
    return this.fetch('/article/getArticleDetail', options);
  }

  getArticleRecommendLinks(articleId) {
    options.body = JSON.stringify({ articleId });
    return this.fetch('/article/getArticleRecommendLinks', options);
  }

  deleteCategory(categoryId) {
    options.body = JSON.stringify({ categoryId });
    return this.fetch('/category/deleteCategory', options);
  }
}
