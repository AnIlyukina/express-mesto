const express = require('express');
const {
  getUsers, createUser, getUserById, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/:id', getUserById);

userRoutes.post('/', createUser);

userRoutes.patch('/me', updateUserInfo);

userRoutes.patch('/me/avatar', updateUserAvatar);

exports.userRoutes = userRoutes;
