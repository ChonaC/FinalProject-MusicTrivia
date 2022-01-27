import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Result, Button } from "antd";

const NotFound = () => {
    const pathname = useLocation().pathname;
    console.log(pathname);

    return (
        <Result
            status="404"
            title="404"
            subTitle={`Sorry, the page ${pathname} does not exist.`}
            extra={
                <Link to="/">
                    <Button type="primary">Back Home</Button>
                </Link>
            }
        />
    );
};

export default NotFound;
