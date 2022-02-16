// eslint-disable-next-line import/no-unresolved
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');
const User = require('../models/user');

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

exports.createUser = async (req, res) => {
  try {
    const { body } = req;
    const user = new User(body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    res.status(201).send(await user.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы невалидные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
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
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    }
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};
