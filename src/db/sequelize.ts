import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
  // logging: (...msg) => console.log(msg),
});

export default sequelize;
