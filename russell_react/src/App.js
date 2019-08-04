import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { Redirect, Route, Router } from 'react-router-dom';
import { Spin } from 'antd';
import './App.less';
import moment from 'moment';
import history from './_helpers';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const Loading = () => (
  <div className="loading">
    <Spin size="large" />
  </div>
);

const AdminMain = Loadable({
  loader: () => import('./containers/admin/Main/Main'),
  loading: Loading
});

const Home = Loadable({
  loader: () => import('./containers/Home'),
  loading: Loading
});

// const Main = Loadable({
//   loader: () => import('./containers/Main'),
//   loading: Loading
// });

const Index = Loadable({
  loader: () => import('./pages/index'),
  loading: Loading
});

const Login = Loadable({
  loader: () => import('./containers/admin/Login'),
  loading: Loading
});

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        <Route path="/category" component={Index} />
        <PrivateRoute path="/admin" component={AdminMain} />
        <Route path="/loginAdmin" component={Login} />
      </div>
    </Router>
  );
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('user') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/loginAdmin',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  location: PropTypes.string.isRequired
};

export default App;
