// ============================================================================
//                        Файл настроек для валидации данных
// ============================================================================

// ======================== Импортируем все необходимое =======================

// Подключаем необходимые библиотеки валидации
const {
  celebrate,
  Joi,
  CelebrateError,
} = require('celebrate');

// Подключаем валидатор
const validator = require('validator');

// Импортируем текст сообщений
const { URL_INCORRECT } = require('../utils/constants');

// Валидатор ссылок
const validateUrl = (v) => {
  if (!validator.isURL(v)) {
    return new CelebrateError(URL_INCORRECT);
  }
  return v;
};

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
    name: Joi.string().min(2).max(30).required(),
  }),
});

// Валидатор для обновления профиля пользователя
const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

// Валидатор для добавления фильма
const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateUrl),
    trailerLink: Joi.string().required().custom(validateUrl),
    thumbnail: Joi.string().required().custom(validateUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// Валидатор для проверки id
const validationId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateLogIn,
  validateUser,
  validateUpdateProfile,
  validateMovie,
  validationId,
};
