/* eslint-disable no-restricted-syntax */
import { DataTypes } from 'sequelize';
import sequelize from '../../db/sequelize';
import { hashString } from '../../utils/passHash';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'email',
      msg: 'Email address already in use!',
    },
    validate: {
      isEmail: true,
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      // this will check for a mix of upper/lowercase letters, number and special chars
      is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      len: {
        msg: 'Password must be between 8 and 16 characters',
        args: [8, 16],
      },
    },
  },
}, {
  timestamps: true,
});

function beforeCreate(user) {
  const hashedValues = hashString(user.getDataValue('password') || process.env.DEFAULT_USER_PASSWORD);

  user.setDataValue('salt', hashedValues.salt);
  user.setDataValue('password', hashedValues.hash);
}

// schema hook which will fire prior to user creation
User.beforeCreate((user) => beforeCreate(user));
User.beforeBulkCreate((users, options) => {
  for (const user of users) {
    beforeCreate(user);
  }
});

// Create the table if it doesn't exist
User.sync();

export default User;
