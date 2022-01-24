const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        songs: [Song]
        scores: [Score]
    }

    type Song {
        _id: ID
        song_name: String
        video_id: String
        user: User
    }

    type Score {
        _id: ID
        points: Int
        date_created: String
        username: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        songs: [Song]
        scores: [Score]

        user: User

        userByUsername(username: String!): User
        song(_id: ID!): Song
        score(_id: ID!): Score

        songsofUser(username: String!): [Song]
        scoresOfUser(username: String!): [Score]
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth

        login(username: String!, email: String!, password: String!): Auth

        addSong(song_name: String!, video_id: String!): Song

        addScore(points: Int!): Score
        updateScore(_id: ID!, points: Float!): Score

        removeSong(_id: ID!): Song
        removeScore(_id: ID!): Score
    }
`;
module.exports = typeDefs;
