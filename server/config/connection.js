import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres://username:password@127.0.0.1:5432/dbname');

export default sequelize;