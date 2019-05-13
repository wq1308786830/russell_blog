import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArticleListContainer from './containers/ArticleListContainer';
import ArticleDetail from './containers/ArticleDetail';

// todo:每个路由层级对应的组件可能需要优化
const ContentRouter = () => (
  <Switch>
    <Route
      exact
      path="/category/:categoryId/articles"
      component={ArticleListContainer}
    />
    <Route
      exact
      path="/category/:categoryId/articles/:articleId/detail"
      component={ArticleDetail}
    />
  </Switch>
);

export default ContentRouter;
