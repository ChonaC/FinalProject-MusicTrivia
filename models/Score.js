const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Score extends Model { }

Score.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // * Score out of 100% so 1.00 is 100% use decimal easier for percentage
        points: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        // * Date the user got this score
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
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
        modelName: "score",
    }
);

module.exports = Score;
