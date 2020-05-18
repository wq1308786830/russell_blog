import {ApolloServer} from "apollo-server";

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const {createStore} = require('./utils');

const store = createStore();


const dataSources = () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({store}),
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,

});