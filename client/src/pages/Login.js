import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN } from "../utils/mutations";

import { Typography, Form, Input, Button } from "antd";
import { LoginOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
const { Title } = Typography;

const Login = () => {
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    });

    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        // event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: {
                    username: formState.username,
                    password: formState.password,
                    email: formState.username,
                },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

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

            <Form {...formItemLayout} onFinish={handleFormSubmit}>
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
                        name="username"
                        onChange={handleChange}
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
                        name="password"
                        placeholder="••••••••••"
                        onChange={handleChange}
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
