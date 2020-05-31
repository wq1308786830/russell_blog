const {RESTDataSource} = require("apollo-datasource-rest");

class LaunchAPI extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = 'http://localhost:5002/';
  }

  async getAllCategories () {
    const resp = await this.get(`category/getAllCategories`);
    return resp.data;
  }
}

module.exports = LaunchAPI;
