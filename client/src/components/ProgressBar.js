import React from "react";
import { Progress } from "antd";

const ProgressBar = (props) => {
    return (
        <Progress
            percent={Math.round((props.completed / props.length) * 100)}
            status={
                Math.round((props.completed / props.length) * 100) === 100
                    ? "success"
                    : "active"
            }
        />
    );
};

export default ProgressBar;
