module.exports = {
  Query: {
    allCategories: async (_, {}, {dataSources}) => {
      return await dataSources.launchAPI.getAllCategories();
    }
  }
}
