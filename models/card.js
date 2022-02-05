const mongoose = require('mongoose');

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
    // eslint-disable-next-line no-undef
    type: ObjectId,
    required: true,
  },
  likes: {
    // eslint-disable-next-line no-undef
    type: ObjectId,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
