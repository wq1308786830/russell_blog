import md5 from 'md5';
import Request from '../utils/request';

function login(formData) {
  const params = {
    ...formData,
    password: md5(formData.password)
  };
  return Request.POST('/user/login', params);
}

function getArticles(option, pageIndex) {
  const params = { ...option, pageIndex };
  return Request.GET(`/article/getArticles`, params);
}

function publishArticle(body) {
  return Request.POST('/article/publishArticle', { ...body });
}

function deleteArticle(id) {
  return Request.GET('/article/deleteArticle', { id });
}

function addCategory(fatherId, level, categoryName) {
  return Request.PUT('/category/addCategory', { fatherId, level, categoryName });
}

export default {
  login,
  getArticles,
  publishArticle,
  deleteArticle,
  addCategory
};
