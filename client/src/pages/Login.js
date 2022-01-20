import React from "react";
import { Link } from "react-router-dom";
import { Typography, Form, Input, Button } from "antd";
import { LoginOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
const { Title } = Typography;

const Login = () => {
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 10 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (
        <div className="page">
            <Title style={{ textAlign: "center" }}>Log in</Title>

            <Form {...formItemLayout}>
                <Form.Item
                    name="username"
                    label="Username/Email"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input your username or email!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username/Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="••••••••••"
                    />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<LoginOutlined />}
                    >
                        Log in
                    </Button>
                    &nbsp;Or <Link to="/signup">sign up now!</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
