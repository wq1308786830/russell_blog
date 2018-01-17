import React, {Component} from 'react';
import NormalLoginForm from '../../components/NormalLoginForm/NormalLoginForm'

import {Card, Col, Layout, Row} from 'antd';
import 'antd/dist/antd.css';
import './Login.css';
import {Form} from "antd/lib/index";

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends Component {
    render() {
        return (
            <Layout className="Login gradient-bg">
                <div className="back-img">
                    <Row className="form-container">
                        <Col span={6} offset={18}>
                            <Card style={{width: 350}} className="Card">
                                <WrappedNormalLoginForm/>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

export default Login;
