import React from "react";

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
                style={{ marginTop: 20 }}
                preview={false}
                src={props.songImage}
            />
            {props.choices.map((title) => (
                <Button
                    type="primary"
                    block
                    style={{ marginTop: 20, height: 40 }}
                    onClick={handleQuestion}
                >
                    <Title level={5} style={{ color: "white" }} ellipsis>
                        {title}
                    </Title>
                </Button>
            ))}
        </div>
    );
};

export default Question;
