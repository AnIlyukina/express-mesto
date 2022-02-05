const User = require('../models/user');

exports.getUsers = async (res) => {
  const users = await User.find({});
  res.status(200).send(users);
};

exports.getUsersById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};

// exports.createUsers = (req, res) => {
//   res.status(201).send(req.body);
// };
