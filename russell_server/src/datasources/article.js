const {RESTDataSource} = require("apollo-datasource-rest");

class ArticleAPI extends RESTDataSource {

  constructor() {
    super();
  }

  get baseURL() {
    if (this.context.env === 'development') {
      return 'http://localhost:5002/article/';
    } else {
      return 'https://movies-api.example.com/';
    }
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getArticleList (key) {
    const resp = await this.get(`getArticleList`, {key});
    return resp.data;
  }
}

module.exports = ArticleAPI;
