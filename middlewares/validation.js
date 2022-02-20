const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateRegisterBody = celebrate({
  body: {
    // name: Joi.string().required().min(2).max(30),

    // about: Joi.string().required().min(2).max(20),

    // avatar: Joi.string().custom((value, helpers) => {
    //   if (validator.isEmail(value)) {
    //     return value;
    //   }
    //   return helpers.message('Невалидный email');
    // }).required().messages({
    //   'any.required': 'Обязательное поле',
    // }),

    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    }).messages({
      'any.required': 'Обязательное поле',
    }),

    password: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
        'any.required': 'Обязательное поле',
      }),
  },
});

module.exports = {
  validateRegisterBody,
};
