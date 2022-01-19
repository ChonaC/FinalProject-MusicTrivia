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

        user :async(parent, { username })=>{
            return User.findOne({username:username})
        },
        song: async (parent, { songId }) => {
            return Song.findOne({ _id:songId });
          },
        score: async (parent, { scoreId }) => {
            return Profile.findOne({ _id: scoreId });
          }
          

    },
    Mutation: {

        addUser: async (parent, { username, email, password }) => {
          const profile = await User.create({ username, email, password });
          const token = signToken(profile);
          return { token, profile };
        },

        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
      
            if (!user) {
              throw new AuthenticationError('No profile with this email found!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
      
            const token = signToken(user);
            return { token, user };
          },
        
        addSong: async (parent, { song_name, video_id },context) => {
            if (context.user) {
                const song = await Song.create({
                    song_name,
                    video_id,
                    username: context.user.username
                });
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet : {song:song._id}}  
                );
                return song;
            }
            throw new AuthenticationError('You need to be logged in!');
        },


    }


};
module.exports = resolvers;