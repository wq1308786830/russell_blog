import md5 from 'md5';
import request, { options } from '../utils/utils';

export default class AdminServices {
  constructor() {
    this.fetch = request;
  }

  login(formData) {
    options.body = JSON.stringify({
      user_name: formData.user_name,
      password: md5(formData.password),
    });
    return this.fetch('/admin/login', options);
  }

  getArticles(option, pageIndex) {
    options.body = JSON.stringify({ option, pageIndex });
    return this.fetch('/manage/getArticles', options);
  }

  publishArticle(body) {
    options.body = JSON.stringify({ ...body });
    return this.fetch('/manage/publishArticle', options);
  }

  deleteArticle(id) {
    options.body = JSON.stringify({ id });
    return this.fetch('/manage/deleteArticle', options);
  }

  addCategory(fatherId, level, categoryName) {
    options.body = JSON.stringify({ fatherId, level, categoryName });
    return this.fetch('/manage/addCategory', options);
  }
}
