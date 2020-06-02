module.exports = {
  Query: {
    allCategories: async (_source, _args, {dataSources}) => {
      return await dataSources.launchAPI.getAllCategories();
    },
    articles: async (_source, {key}, {dataSources}) => {
      return await dataSources.articleAPI.getArticleList(key);
    }
  }
}
