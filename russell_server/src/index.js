const {ApolloServer} = require('apollo-server');
const LaunchAPI = require('./datasources/launch');
const ArticleAPI = require('./datasources/article');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  articleAPI: new ArticleAPI()
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  debug: true,
  typeDefs,
  resolvers,
  dataSources,
  context: (integrationContext) => ({
    env: process.argv[2],
    // Important: The `integrationContext` argument varies depending
    // on the specific integration (e.g. Express, Koa,  Lambda, etc.)
    // being used. See the table below for specific signatures.

    // For example, using Express's `authorization` header, and a
    // `getScope` method (intentionally left unspecified here):
    // authScope: getScope(integrationContext.req.headers.authorization)
  }),
});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
