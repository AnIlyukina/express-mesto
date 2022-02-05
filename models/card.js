const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const ObjectId = mongoose.Types.ObjectId();

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная строка 2 символа'],
    maxlength: [30, 'Максимальная строка 30 символов'],
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: ObjectId,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Card', cardSchema);
