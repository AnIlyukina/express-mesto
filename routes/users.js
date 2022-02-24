const express = require('express');
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getMyUser,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/me', getMyUser);

userRoutes.get('/:id', getUserById);

userRoutes.patch('/me', updateUserInfo);

userRoutes.patch('/me/avatar', updateUserAvatar);

exports.userRoutes = userRoutes;
