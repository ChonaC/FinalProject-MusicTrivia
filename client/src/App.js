import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Layout } from "antd";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";

function App() {
    return (
        <Router>
            <Layout style={{ height: "100vh" }}>
                <Header />
                <Layout
                    style={{
                        padding: "0 32px",
                        marginTop: 32,
                        marginBottom: 32,
                    }}
                >
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/leaderboard">
                        <Leaderboard />
                    </Route>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;
