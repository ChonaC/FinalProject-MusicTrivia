import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

import { Typography, Form, Input, Button, message } from "antd";
import {
    MailOutlined,
    UserAddOutlined,
    UserOutlined,
    LockOutlined,
} from "@ant-design/icons";
const { Title } = Typography;

const SignUp = () => {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        // event.preventDefault();
        try {
            const mutationResponse = await addUser({
                variables: {
                    email: formState.email,
                    password: formState.password,
                    username: formState.username,
                },
            });
            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
            message.error(e.message);
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
            <Title className="courgette" style={{ textAlign: "center" }}>
                Sign up
            </Title>
            <Form {...formItemLayout} onFinish={handleFormSubmit}>
                <Form.Item
                    name="username"
                    label="Username"
                    hasFeedback
                    tooltip="How others will see you on the leaderboard."
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    hasFeedback
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <MailOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                        name="email"
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
                        {
                            min: 8,
                            message: "Password must be at least 8 characters",
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
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "The two passwords that you entered do not match!"
                                    )
                                );
                            },
                        }),
                    ]}
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
                        shape="round"
                        icon={<UserAddOutlined />}
                    >
                        Register
                    </Button>
                    &nbsp;Or <Link to="/login">log in now!</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUp;
