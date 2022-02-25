const express = require('express');
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getMyUser,
} = require('../controllers/users');
const { validateUserId, validateAvatar, validateUserUpdate } = require('../middlewares/validation');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/me', getMyUser);

userRoutes.get('/:id', validateUserId, getUserById);

userRoutes.patch('/me', validateUserUpdate, updateUserInfo);

userRoutes.patch('/me/avatar', validateAvatar, updateUserAvatar);

exports.userRoutes = userRoutes;
