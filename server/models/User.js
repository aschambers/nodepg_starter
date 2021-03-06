import Sequelize from 'sequelize';
import sequelize from '../config/connection';
import bcrypt from 'bcrypt';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},
{
  // use this hook to hash the users password with salt, where the number is the number
  // of salt rounds
  hooks: {
    beforeCreate: (user, options) => {
      {
        user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
      }
    }
  }
});

export default User;