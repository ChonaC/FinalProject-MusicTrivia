import React from "react";
// import { Link } from 'react-router-dom';
import { Menu } from "antd";
import { HomeOutlined, TrophyOutlined, LoginOutlined } from "@ant-design/icons";

const Header = () => {
    return (
        <Menu mode="horizontal">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                Home
            </Menu.Item>
            <Menu.Item key="leaderboard" icon={<TrophyOutlined />}>
                Leaderboard
            </Menu.Item>
            <Menu.Item key="login" icon={<LoginOutlined />}>
                Login
            </Menu.Item>
        </Menu>
    );
};

export default Header;
