const express = require('express');

const { userRoutes } = require('./users');

// const { cardsRoutes } = require('./cards');

const routes = express.Router();

routes.use('/users', userRoutes);
// routes.use('/cards', cardsRoutes);

exports.routes = routes;
