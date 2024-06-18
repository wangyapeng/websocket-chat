import mysql from 'mysql2';
import { config } from './config.js'
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true,
  }
})

sequelize.authenticate().then(() => {
  console.log('connect sql success!');
})

export { sequelize }