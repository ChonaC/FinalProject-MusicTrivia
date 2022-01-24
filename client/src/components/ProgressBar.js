import React from "react";
import { Progress } from "antd";

const ProgressBar = (props) => {
    return (
        <Progress
            percent={
                props.gameOver === true
                    ? 100
                    : Math.round((props.completed / props.length) * 100)
            }
            status={props.gameOver === true ? "success" : "active"}
        />
    );
};

export default ProgressBar;
