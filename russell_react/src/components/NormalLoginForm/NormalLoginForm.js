import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Checkbox, Form, Icon, Input, message,
} from 'antd';

import Recaptcha from 'react-recaptcha';
import AdminServices from '../../services/AdminServices';
import './NormalLoginForm.less';
import history from '../../_helpers';

export default class NormalLoginForm extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      const { form } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          new AdminServices().login(values)
            .then((data) => {
              if (data.success) {
                localStorage.setItem('user', '1');
                history.push('/admin');
              } else {
                message.error(`错误：${data.msg}`);
              }
            })
            .catch((error) => {
              error.response.json()
                .then(data => message.error(`错误${e.response.status}：${data.msg}`));
            });
        }
      });
    };

    onloadCallback = () => {
      console.log('Done!!!');
    };

    verifyCallback = (resp) => {
      console.log(resp);
    };

    render() {
      const { form } = this.props;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {form.getFieldDecorator('user_name', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />,
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>,
            )}
            <Link to="" className="login-form-forgot">忘记密码？</Link>
            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
          </Form.Item>
          <Recaptcha
            sitekey="6LfEhDwUAAAAAPEPGFpooDYCHBczNAUu90medQoD"
            render="explicit"
            verifyCallback={this.verifyCallback}
            onloadCallback={this.onloadCallback}
            type="image"
            hl="zh-CN"
          />
        </Form>
      );
    }
}
