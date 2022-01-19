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
        }
    }




};
module.exports = resolvers;