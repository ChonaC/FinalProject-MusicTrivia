const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const scoreSchema = new Schema(
    {
        
        
        points: {
            type: Schema.Types.Decimal128,
            required: 'Please provide points',
        },
        // * Date the user got this score
        date_created: {
            type: Date,
            required:'Please provide creation date',
            default:Date.now,
            get:(timestamp) => dateFormat(timestamp),
        },
        user: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
          ]
    }
);

module.exports = model(Score,scoreSchema);
