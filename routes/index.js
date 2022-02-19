const express = require('express');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const { userRoutes } = require('./users');

const { cardsRoutes } = require('./cards');

const routes = express.Router();

routes.post('/signup', createUser);
routes.post('/signin', login);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);

routes.use((req, res) => {
  res.status(404).send({ message: `Aдреса ${req.path} не существует` });
});

exports.routes = routes;
