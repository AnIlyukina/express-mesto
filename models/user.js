const mongoose = require('mongoose');
const validator = require('validator');
// eslint-disable-next-line import/no-unresolved
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная строка 2 символа'],
    maxlength: [30, 'Максимальная строка 30 символов'],
  },
  about: {
    type: String,
    required: false,
    default: 'Исследователь',
    minlength: [2, 'Минимальная строка 2 символа'],
    maxlength: [30, 'Максимальная строка 30 символов'],
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Некорректный URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Минимальная длина пароля 8 символов'],
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    return Promise.reject(new Error('Неправильные почта или пароль'));
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return Promise.reject(new Error('Неправильные почта или пароль'));
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
