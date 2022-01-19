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
          

    },
    Mutation: {
        addUser: async (parent, { name, email, password }) => {
          const profile = await Profile.create({ name, email, password });
          const token = signToken(profile);
    
          return { token, profile };
        }

    }


};
module.exports = resolvers;