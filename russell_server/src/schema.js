const { gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Category {
    father_id: Int
    id: Int
    level: Int
    name: String
    subCategory: [Category]
  }
  type Query {
    books: [Book]
    allCategories: [Category]
  }
`;

module.exports = typeDefs;
