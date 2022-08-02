// ============================================================================
//                        Файл настроек для валидации данных
// ============================================================================

// ======================== Импортируем все необходимое =======================

// Подключаем необходимые библиотеки валидации
const {
  celebrate,
  Joi,
//  CelebrateError,
} = require('celebrate');

// Подключаем валидатор
// const validator = require('validator');

// Валидатор ссылок
// const validateUrl = (v) => {
//   if (!validator.isURL(v)) {
//     throw new CelebrateError('Неверный формат ссылки');
//   }
//   return v;
// };

// Валидатор для для входа пользователя на сайт (signin)
const validateLogIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Валидатор для регистрации пользователя на сайте (signup)
const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

// Валидатор для обновления профиля пользователя
const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  validateLogIn,
  validateUser,
  validateUpdateProfile,
};
