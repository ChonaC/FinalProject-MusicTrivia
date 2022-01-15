const User = require("./User");
const Song = require("./Song");
const Score = require("./Score");

User.hasMany(Song, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Song.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Score, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Score.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = {
    Song,
    User,
    Score,
};
