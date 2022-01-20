import React from "react";
import { Typography, Form, Select, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import logo from "../assets/images/music-trivia-logo.png";

const { Option } = Select;
const { Title } = Typography;

const Home = () => {
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
                    <Select placeholder="Select the length of the quiz">
                        <Option value="5">5 songs</Option>
                        <Option value="10">10 songs</Option>
                        <Option value="15">15 songs</Option>
                        <Option value="20">20 songs</Option>
                        <Option value="25">25 songs</Option>
                    </Select>
                </Form.Item>
            </Form>
            <Button
                type="primary"
                shape="round"
                size="large"
                icon={<PlayCircleOutlined />}
            >
                Start Quiz
            </Button>
        </div>
    );
};

export default Home;
