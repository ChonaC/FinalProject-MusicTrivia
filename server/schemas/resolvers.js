const { AuthenticationError } = require('apollo-server-express');
const { Profile, User, Song } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {


    Query:{
        users: async() =>{
            return User.find();
        },
        songs: async() =>{
            return Song.find();
        },
        scores: async() =>{
            return Score.find();
        },

        user :async(parent, { userName })=>{
            return User.findOne({username:userName})
        },
        song: async (parent, { songId }) => {
            return Song.findOne({ _id:songId });
          },
        score: async (parent, { scoreId }) => {
            return Profile.findOne({ _id: scoreId });
          }


    }




};
module.exports = resolvers;