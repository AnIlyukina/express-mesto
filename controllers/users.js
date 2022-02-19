// eslint-disable-next-line import/no-unresolved
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SOLT_ROUND = 10;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы невалидные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

// eslint-disable-next-line consistent-return
exports.createUser = async (req, res) => {
  try {
    const { body } = req;

    if (!body.email || !body.password) {
      res.status(400).send({ message: 'Не верный email или пароль' });
    }

    const salt = await bcrypt.genSalt(SOLT_ROUND);
    body.password = await bcrypt.hash(body.password, salt);
    const user = await User.create(body);

    res.status(201).send(user);
  } catch (err) {
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      return res.status(409).send({ message: 'Такой пользователь уже существует' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы невалидные данные', error: err });
    }
    res.status(500).send({ message: 'Произошла ошибка на сервере', error: err });
  }
};

exports.updateUserInfo = async (req, res) => {
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
      res.status(400).send({ message: 'Переданы невалидные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

exports.updateUserAvatar = async (req, res) => {
  try {
    const userAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true },
    );
    res.send(userAvatar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы невалидные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

exports.login = async (req, res) => {
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
    res.status(401).send({ message: err.message });
  }
};
