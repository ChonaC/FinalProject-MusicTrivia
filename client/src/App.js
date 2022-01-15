import React from "react";
import "antd/dist/antd.css";
import "./App.css";
// import { BrowserRouter as Router, Route } from "react-router-dom";

import { Layout } from "antd";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
    return (
        <Layout>
            <Header />
            <Layout
                style={{
                    padding: "0 50px",
                    marginTop: 64,
                    marginBottom: 64,
                }}
            >
                <Home />
            </Layout>
        </Layout>
    );
}

export default App;
