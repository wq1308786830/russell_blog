import React from 'react';
import Loadable from 'react-loadable';
import {Redirect, Route, Router} from "react-router-dom";
import {history} from './_helpers';
import {Spin} from "antd";
import './App.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const Loading = () => (
    <div className="loading">
        <Spin size="large"/>
    </div>
);

const AdminMain = Loadable({
    loader: () => import('./containers/admin/Main/Main'),
    loading: Loading,
});

const Main = Loadable({
    loader: () => import('./containers/Main'),
    loading: Loading,
});

const Login = Loadable({
    loader: () => import('./containers/admin/Login'),
    loading: Loading,
});

class App extends React.Component {

    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <Route exact path="/" render={() => <Redirect to="/category"/>}/>
                    <Route path="/category" component={Main}/>
                    <PrivateRoute path='/admin' component={AdminMain}/>
                    <Route path="/  " component={Login}/>
                </div>
            </Router>
        );
    }
}

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{pathname: '/loginAdmin', state: {from: props.location}}}/>
    )}/>
);

export default App;
