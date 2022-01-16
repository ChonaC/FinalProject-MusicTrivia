import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, TrophyOutlined, LoginOutlined } from "@ant-design/icons";

const Header = () => {
    return (
        <Menu mode="horizontal">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="leaderboard" icon={<TrophyOutlined />}>
                <Link to="/leaderboard">Leaderboard</Link>
            </Menu.Item>
            <Menu.Item key="login" icon={<LoginOutlined />}>
                <Link to="/login">Login</Link>
            </Menu.Item>
        </Menu>
    );
};

export default Header;
