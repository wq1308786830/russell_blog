import request from '../utils/utils';

export default class BlogServices {
  constructor() {
    this.fetch = request;
  }

  getCategories(fatherId) {
    return this.fetch(
      'GET',
      '/category/getCategories',
      JSON.stringify({ fatherId }),
    );
  }

  getAllCategories() {
    return this.fetch('/category/getAllCategories');
  }

  getArticleList(key) {
    return this.fetch('/article/getArticleList', JSON.stringify({ key }));
  }

  getArticleDetail(articleId) {
    return this.fetch(
      '/article/getArticleDetail',
      JSON.stringify({ articleId }),
    );
  }

  getArticleRecommendLinks(articleId) {
    return this.fetch(
      '/article/getArticleRecommendLinks',
      JSON.stringify({ articleId }),
    );
  }

  deleteCategory(categoryId) {
    return this.fetch(
      '/category/deleteCategory',
      JSON.stringify({ categoryId }),
    );
  }
}
