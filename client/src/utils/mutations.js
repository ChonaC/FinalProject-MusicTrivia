import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation login($username: String!, $email: String!, $password: String!) {
        login(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_SCORE = gql`
    mutation addScore($points: Int!) {
        addScore(points: $points) {
            points
        }
    }
`;
