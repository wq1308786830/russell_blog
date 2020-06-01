module.exports = {
  Query: {
    allCategories: async (_source, _args, {dataSources}) => {
      return await dataSources.launchAPI.getAllCategories();
    }
  }
}
