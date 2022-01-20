const { AuthenticationError } = require('apollo-server-express');
const { Profile, User, Song, Score } = require('../models');
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
          },
          songsofUser: async (parent,{username}) =>{
            return Song.find({username:username});
          },
          scoresOfUser: async (parent,{username}) =>{
            const score = await Score.find({username:username} )
              
            return score;
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

            console.log('context',context);
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

        addScore: async (parent, { points },context) => {
            if (context.user) {
                const score = await Score.create({
                    points,
                    username: context.user.username
                });
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet : {score:score._id}}  
                );
                return score;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeSong:async(parent,{_id},context) =>{
            if(context.user){
            return Song.findOneAndDelete({_id:_id});
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeScore:async(parent,{_id},context) =>{
            if(context.user){
            return Score.findOneAndDelete({_id:_id});
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateScore: async(parent,{_id,points},context) =>{
            if(context.user){
                return await Score.findOneAndUpdate(
                    { _id: _id }, 
                    { points },
                    // Return the newly updated object instead of the original
                    { new: true }
                  );
            }
            throw new AuthenticationError('You need to be logged in!');
        }
 
    }

};
module.exports = resolvers;