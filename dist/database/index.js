"use strict";
//arquivo de conexão com o banco de dados
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_1 = require("sequelize");
exports.database = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: 'iagoflixdevelopment.c5o7viiptd3e.us-east-2.rds.amazonaws.com',
    port: 5432,
    database: 'iagoflix_development',
    username: 'iagoflix',
    password: 'iagoflix',
    define: {
        underscored: true
    }
});
