import React, {Component} from 'react';
import {Redirect, Route, Router} from "react-router-dom";

import 'antd/dist/antd.css';
import './App.css';
import Main from "./containers/Main";
import Login from "./containers/Login/Login";
import {history} from './_helpers'
import EditArticle from "./containers/admin/editArticle";

class App extends Component {

    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // console.log((location, action));
        });
    }

    state = {
        redirectToReferrer: false,
        url: '/loginAdmin'
    };


    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <PrivateRoute exact path='/admin' component={EditArticle}/>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/loginAdmin" component={Login}/>
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
