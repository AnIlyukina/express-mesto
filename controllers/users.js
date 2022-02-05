const User = require('../models/user');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

exports.getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  // eslint-disable-next-line no-empty
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

exports.createUsers = async (req, res) => {
  try {
    const user = new User(req.body);
    res.status(201).send(await user.save());
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};
