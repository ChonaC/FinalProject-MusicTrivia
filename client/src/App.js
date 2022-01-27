import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import { Layout } from "antd";

const httpLink = createHttpLink({
    uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Layout style={{ minHeight: "100vh" }}>
                    <Navbar />
                    <Layout
                        style={{
                            padding: "0 32px",
                            marginTop: 32,
                            marginBottom: 32,
                        }}
                    >
                        <Switch>
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
                            <Route exact path="/profile">
                                <Profile />
                            </Route>
                            <Route>
                                <NotFound />
                            </Route>
                        </Switch>
                    </Layout>
                </Layout>
            </Router>
        </ApolloProvider>
    );
}

export default App;
