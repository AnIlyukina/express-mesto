const express = require('express');
const { getUsers, createUsers, getUsersById } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.post('/:id', getUsersById);

userRoutes.post('/', express.json(), createUsers);

exports.userRoutes = userRoutes;
