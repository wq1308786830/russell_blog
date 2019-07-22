import md5 from 'md5';
import request from '../utils/utils';

export default class AdminServices {
  constructor() {
    this.fetch = request;
  }

  login(formData) {
    return this.fetch(
      '/user/login',
      `user_name=${formData.user_name}&password=${md5(formData.password)}`,
      'POST',
    );
  }

  getArticles(option, pageIndex) {
    const params = { ...option, pageIndex };
    const searchParams = Object.keys(params)
      .map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
      })
      .join('&');
    return this.fetch(`/article/getArticles?${searchParams}`, null);
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
