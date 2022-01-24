const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const scoreSchema = new Schema({
    points: {
        type: Number,
        required: "Please provide points",
    },
    // * Date the user got this score
    username: {
        type: String,
        required: "Please provide username",
    },
    tags: [
        {
            type: String,
        },
    ],
    date_created: {
        type: Date,
        required: "Please provide creation date",
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});

module.exports = model("Score", scoreSchema);
