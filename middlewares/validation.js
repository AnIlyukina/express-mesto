const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const validateUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Некорректный URL');
  }
  return value;
};

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().hex().length(30),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validateLogin,
  validateAvatar,
  validateUserUpdate,
  validateUser,
  validateCard,
  validateId,
};
