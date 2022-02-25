const express = require('express');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const { userRoutes } = require('./users');

const { cardsRoutes } = require('./cards');
const { validateUser, validateLogin } = require('../middlewares/validation');
const { NotFoundError } = require('../errors');

const routes = express.Router();

routes.post('/signup', validateUser, createUser);
routes.post('/signin', validateLogin, login);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError(`Aдреса ${req.path} не существует`));
});

exports.routes = routes;
