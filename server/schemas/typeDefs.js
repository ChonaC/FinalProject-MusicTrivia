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

 `;
module.exports = typeDefs;
