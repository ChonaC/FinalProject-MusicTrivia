import React from "react";
import { Typography, Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Profile = () => {
    return (
        <div
            className="page"
            style={{
                textAlign: "center",
            }}
        >
            <Avatar size={200} icon={<AntDesignOutlined />} />
            <Title level={2}>ByteSizeError</Title>
        </div>
    );
};

export default Profile;
