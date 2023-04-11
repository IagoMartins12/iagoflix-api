//arquivo de conexão com o banco de dados

import { Sequelize } from 'sequelize'

export const database = new Sequelize({
  dialect: 'postgres',
  host: 'iagoflixdevelopment.c5o7viiptd3e.us-east-2.rds.amazonaws.com',
  port: 5432,
  database: 'iagoflix_development',
  username: 'iagoflix',
  password: 'iagoflix',
	define: {
    underscored: true
  }
})