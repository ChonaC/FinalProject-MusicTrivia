import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Layout } from "antd";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";

function App() {
    return (
        <Router>
            <Layout style={{ height: "100vh" }}>
                <Navbar />
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
                    <Route exact path="/quiz">
                        <Quiz />
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
