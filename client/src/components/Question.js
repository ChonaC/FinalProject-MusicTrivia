import React from "react";
import ReactPlayer from "react-player";

import { Typography, Button, Image } from "antd";
const { Title, Paragraph } = Typography;

const Question = (props) => {
    const handleQuestion = (event) => {
        console.log(event.target.innerText);
        if (props.songTitle === event.target.innerText) {
            console.log("correct");
            props.setCorrect(props.correct + 1);
        }
        props.newQuestion();
        props.setCompleted(props.completed + 1);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Image
                style={{ marginTop: 20, height: 300, width: 300 }}
                src={props.songImage}
            />
            <Button
                type="primary"
                block
                style={{ marginTop: 20, height: 40 }}
                onClick={handleQuestion}
            >
                <Title level={5} style={{ color: "white" }}>
                    {props.choices[0]}
                </Title>
            </Button>
            <Button
                type="primary"
                block
                style={{ marginTop: 20, height: 40 }}
                onClick={handleQuestion}
            >
                <Title level={5} style={{ color: "white" }}>
                    {props.choices[1]}
                </Title>
            </Button>
            <Button
                type="primary"
                block
                style={{ marginTop: 20, height: 40 }}
                onClick={handleQuestion}
            >
                <Title level={5} style={{ color: "white" }}>
                    {props.choices[2]}
                </Title>
            </Button>
            <Button
                type="primary"
                block
                style={{ marginTop: 20, height: 40 }}
                onClick={handleQuestion}
            >
                <Title level={5} style={{ color: "white" }}>
                    {props.choices[3]}
                </Title>
            </Button>
        </div>
    );
};

export default Question;
