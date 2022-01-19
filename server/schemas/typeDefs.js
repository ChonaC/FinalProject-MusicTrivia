const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    songs: [Song]
    scores:[Score]
  }

  type Song {
    _id: ID
    song_name: String
    video_id: String
    user: User
  }

  type Score {
    _id: ID
    points: Float
    date_created: String
    user: User
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query{
      users:[Users]
      songs:[Songs]
      scores:[Scores]
      user(username: String!): User
      song(_id:ID!): Song
      score(_id:ID!): Score

  }
 `;
module.exports = typeDefs;
