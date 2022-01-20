import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, TrophyOutlined, LoginOutlined } from "@ant-design/icons";
import logo from "../assets/images/music-trivia-logo.png";

const Navbar = () => {
    return (
        <nav>
            <Menu mode="horizontal">
                <Menu.Item key="logo">
                    <Link to="/">
                        <img src={logo} alt="" width="80" height="48" />
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="home"
                    icon={<HomeOutlined />}
                    style={{ marginLeft: "auto" }}
                >
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="leaderboard" icon={<TrophyOutlined />}>
                    <Link to="/leaderboard">Leaderboard</Link>
                </Menu.Item>
                <Menu.Item key="login" icon={<LoginOutlined />}>
                    <Link to="/login">Login</Link>
                </Menu.Item>
            </Menu>
        </nav>
    );
};

export default Navbar;
