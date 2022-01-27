import React from "react";
import Auth from "../utils/auth";
import { Link, useLocation } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

import { Menu } from "antd";
import {
    HomeOutlined,
    TrophyOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import logo from "../assets/images/music-trivia-logo.png";

const Navbar = () => {
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    const pathname = useLocation().pathname;
    console.log(pathname);

    let selected = "logo";
    if (pathname === "/") {
        selected = "home";
    } else if (pathname === "/leaderboard") {
        selected = "leaderboard";
    } else if (pathname === "/profile") {
        selected = "profile";
    } else if (pathname === "/login") {
        selected = "login";
    } else if (pathname === "/signup") {
        selected = "signup";
    }

    return (
        <nav>
            <Menu mode="horizontal" selectedKeys={selected}>
                <Menu.Item key="logo">
                    <Link to="/">
                        <img src={logo} alt="" width="50" height="50" />
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
                {user ? (
                    <>
                        <Menu.Item key="profile" icon={<UserOutlined />}>
                            <Link to="/profile">{user.username}</Link>
                        </Menu.Item>
                        <Menu.Item key="logout" icon={<LogoutOutlined />}>
                            <Link to="/login" onClick={() => Auth.logout()}>
                                Log Out
                            </Link>
                        </Menu.Item>
                    </>
                ) : null}

                {user ? null : (
                    <>
                        <Menu.Item key="login" icon={<LoginOutlined />}>
                            <Link to="/login">Log in</Link>
                        </Menu.Item>
                        <Menu.Item key="signup" icon={<PlusCircleOutlined />}>
                            <Link to="/signup">Sign up</Link>
                        </Menu.Item>
                    </>
                )}
            </Menu>
        </nav>
    );
};

export default Navbar;
