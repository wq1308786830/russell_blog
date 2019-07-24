import md5 from 'md5';
import request from '../utils/request';

export default class AdminServices {
  constructor() {
    this.fetch = request;
  }

  login(formData) {
    formData.password = md5(formData.password);
    return this.fetch.POST('/user/login', formData);
  }

  getArticles(option, pageIndex) {
    const params = { ...option, pageIndex };
    return this.fetch.GET(`/article/getArticles`, params);
  }

  publishArticle(body) {
    return this.fetch('/article/publishArticle', JSON.stringify({ ...body }));
  }

  deleteArticle(id) {
    return this.fetch('/article/deleteArticle', JSON.stringify({ id }));
  }

  addCategory(fatherId, level, categoryName) {
    return this.fetch(
      '/category/addCategory',
      JSON.stringify({ fatherId, level, categoryName }),
    );
  }
}
