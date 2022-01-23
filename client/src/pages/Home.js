import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Typography, Form, Select, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import logo from "../assets/images/music-trivia-logo.png";

const { Option } = Select;
const { Title } = Typography;

const Home = () => {
    const [questions, setQuestions] = useState(5);

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
    };

    return (
        <div
            id="start-page"
            className="page"
            style={{
                textAlign: "center",
            }}
        >
            <img
                src={logo}
                alt=""
                style={{ width: "50vh", maxWidth: "70vw" }}
            />
            <Title>Music Trivia</Title>

            <p>Guess the name of each song.</p>
            <Form {...formItemLayout}>
                <Form.Item
                    name="quiz-length"
                    label="Quiz Length"
                    rules={[{ required: true }]}
                >
                    <Select
                        onChange={(value) => setQuestions(value)}
                        placeholder="5 songs"
                    >
                        <Option value="5">5 songs</Option>
                        <Option value="10">10 songs</Option>
                        <Option value="15">15 songs</Option>
                        <Option value="20">20 songs</Option>
                        <Option value="25">25 songs</Option>
                    </Select>
                </Form.Item>
            </Form>

            <Link to={`/quiz?length=${questions}`}>
                <Button
                    type="primary"
                    shape="round"
                    size="large"
                    icon={<PlayCircleOutlined />}
                ></Button>
            </Link>
        </div>
    );
};

export default Home;
