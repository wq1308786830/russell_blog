import md5 from 'md5';
import _fetch, { options } from '../utils/utils';

export default class AdminServices {
  login(formData) {
    options.body = JSON.stringify({
      user_name: formData.user_name, password: md5(formData.password),
    });
    return _fetch('/admin/login', options);
  }

  getArticles(option, pageIndex) {
    options.body = JSON.stringify({ option, pageIndex });
    return _fetch('/manage/getArticles', options);
  }

  publishArticle(body) {
    options.body = JSON.stringify({ body });
    return _fetch('/manage/publishArticle', options);
  }

  changeArticle(body) {
    options.body = JSON.stringify({ body });
    return _fetch('/manage/changeArticle', options);
  }

  deleteArticle(id) {
    options.body = JSON.stringify({ id });
    return _fetch('/manage/deleteArticle', options);
  }

  addCategory(fatherId, level, categoryName) {
    options.body = JSON.stringify({ fatherId, level, categoryName });
    return _fetch('/manage/addCategory', options);
  }
}
