const express = require('express');

const { userRoutes } = require('./users');

const routes = express.Router();

routes.use('/users', userRoutes);

exports.routes = routes;
