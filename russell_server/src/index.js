const {ApolloServer} = require('apollo-server');
const LaunchAPI = require('./datasources/launch');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const dataSources = () => ({
  launchAPI: new LaunchAPI()
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({typeDefs, resolvers, dataSources});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
