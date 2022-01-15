const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Song extends Model {}

Song.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        song_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        video_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "Song",
    }
);

module.exports = Song;
