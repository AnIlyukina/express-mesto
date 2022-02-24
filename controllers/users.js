const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const {
  NotFoundError, BadRequestError, ConflictRequestError, UnAuthtorizedError,
} = require('../errors');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SOLT_ROUND = 10;

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      throw new NotFoundError('Пользователь с указанным id не найден');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    if (!body.email || !body.password) {
      throw new BadRequestError('Не верный email или пароль');
    }

    const salt = await bcrypt.genSalt(SOLT_ROUND);
    body.password = await bcrypt.hash(body.password, salt);
    const user = await User.create(body);

    res.status(201).send(user);
  } catch (err) {
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new ConflictRequestError('Такой пользователь уже существует'));
    }
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
    next(err);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const userInfo = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    );
    res.send(userInfo);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы невалидные данные'));
    } else {
      next(err);
    }
  }
};

exports.updateUserAvatar = async (req, res, next) => {
  try {
    const userAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true },
    );
    res.send(userAvatar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы невалидные данные'));
    } else {
      next(err);
    }
  }
};

exports.getMyUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const currentUser = await User.findById(_id);
    if (!currentUser) {
      throw new NotFoundError('Пользователь с указанным id не найден');
    }
    res.send(currentUser);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userEmail = await User.findUserByCredentials(email, password);
    if (userEmail) {
      const token = jwt.sign(
        { _id: userEmail._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    }
  } catch (err) {
    next(new UnAuthtorizedError('Пользователь не авторизован'));
  }
};
