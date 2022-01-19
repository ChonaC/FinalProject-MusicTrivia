const { Schema, model } = require('mongoose');

const songSchema = new Schema(
    {
        song_name: {
            type: String,
            required: 'Please provide a song name',
            trim: true,
        },
        video_id: {
            type: String,
            required: 'Please provide a video identifier',
            trim: true,
        },
        user: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
          ]
    }
);

module.exports = model('Song',songSchema);
