const { DataTypes } = require('sequelize');
const { db } = require('../database/db.connection');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const defaultImg = 'http://localhost:7000/public/img/user_img.png'

const UserModel = db.define(
  'User',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: () => uuid(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgProfile: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: defaultImg
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(12);
        const secretPassword = await bcrypt.hash(user.password, salt);
        user.password = secretPassword;
      },
    },
  }
);

module.exports = UserModel;
