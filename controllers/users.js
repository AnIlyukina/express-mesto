const User = require('../models/user');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
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
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    res.status(201).send(await user.save());
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
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
    res.status(500).send({ message: err.message });
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
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};
