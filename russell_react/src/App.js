import React from 'react';
import Loadable from 'react-loadable';
import {Redirect, Route, Router} from "react-router-dom";
import {history} from './_helpers';
import {Spin} from "antd";
import './App.less';

const Loading = () => (
    <div className="loading">
        <Spin size="large"/>
    </div>
);

const EditArticle = Loadable({
    loader: () => import('./containers/admin/editArticle'),
    loading: Loading,
});

const Main = Loadable({
    loader: () => import('./containers/Main'),
    loading: Loading,
});

const Login = Loadable({
    loader: () => import('./containers/Login'),
    loading: Loading,
});

class App extends React.Component {

    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <Route exact path="/" render={() => <Redirect to="/category"/>}/>
                    <Route path="/category" component={Main}/>
                    <PrivateRoute path='/admin' component={EditArticle}/>
                    <Route path="/loginAdmin" component={Login}/>
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
