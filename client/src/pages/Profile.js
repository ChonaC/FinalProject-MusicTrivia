import React from "react";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

import { Typography, Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Profile = () => {
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    return (
        <div
            className="page"
            style={{
                textAlign: "center",
            }}
        >
            <Avatar size={200} icon={<AntDesignOutlined />} />
            <Title level={2}>{user.username}</Title>
        </div>
    );
};

export default Profile;
