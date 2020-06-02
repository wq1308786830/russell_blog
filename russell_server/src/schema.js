const {gql} = require('apollo-server');

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

  type Article {
    id: Int
    title: String
    description: String
    avatar: String
    clickCount: Int
    isRecommend: Int
    datePublish: Int
    categoryId: Int
    userId: Int
  }


  type Query {
    books: [Book]
    allCategories: [Category]
    articles(key: String): [Article]
  }
`;

module.exports = typeDefs;
