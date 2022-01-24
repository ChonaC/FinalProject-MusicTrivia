import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Typography, Form, Input, Select, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import logo from "../assets/images/music-trivia-logo.png";

const { Option } = Select;
const { Title } = Typography;

const Home = () => {
    const [questions, setQuestions] = useState(5);
    const [artist, setArtist] = useState("");

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

    const history = useHistory();

    const handleFormSubmit = (event) => {
        history.push(`/quiz?length=${questions}&artist=${artist}`);
    };

    const handleChange = (event) => {
        setArtist(event.target.value);
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
            <Form {...formItemLayout} onFinish={handleFormSubmit}>
                <Form.Item name="quiz-length" label="Quiz Length">
                    <Select
                        onChange={(value) => setQuestions(value)}
                        placeholder="5 songs"
                    >
                        <Option value="5">5 songs</Option>
                        <Option value="10">10 songs</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="artist"
                    label="Artist"
                    rules={[
                        {
                            required: true,
                            message: "Please input artist name!",
                        },
                    ]}
                >
                    <Input onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        shape="round"
                        htmlType="submit"
                        size="large"
                        icon={<PlayCircleOutlined />}
                    ></Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Home;
