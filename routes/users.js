const express = require('express');
const {
  getUsers, createUser, getUserById, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/:id', getUserById);

userRoutes.post('/', express.json(), createUser);

userRoutes.patch('/me', express.json(), updateUserInfo);

userRoutes.patch('/me/avatar', express.json(), updateUserAvatar);

exports.userRoutes = userRoutes;
