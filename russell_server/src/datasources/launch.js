const {RESTDataSource} = require("apollo-datasource-rest");

class LaunchAPI extends RESTDataSource {

  constructor() {
    super();
  }

  get baseURL() {
    if (this.context.env === 'development') {
      return 'http://localhost:5002/';
    } else {
      return 'https://movies-api.example.com/';
    }
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getAllCategories () {
    const resp = await this.get(`category/getAllCategories`);
    return resp.data;
  }
}

module.exports = LaunchAPI;
