const express = require('express');

const { userRoutes } = require('./users');

const { cardsRoutes } = require('./cards');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);

routes.use((req, res) => {
  res.status(404).send({ message: `Aдреса ${req.path} не существует` });
});

exports.routes = routes;
