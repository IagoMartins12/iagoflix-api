"use strict";
// src/models/Episode.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = void 0;
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
exports.Episode = database_1.database.define('Episode', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    synopsis: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT
    },
    order: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    videoUrl: {
        type: sequelize_1.DataTypes.STRING
    },
    secondsLong: {
        type: sequelize_1.DataTypes.INTEGER
    },
    courseId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'courses',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
});
