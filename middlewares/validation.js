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

// Валидатор ссылок
const validateUrl = (v) => {
  if (!validator.isURL(v)) {
    throw new CelebrateError('Неверный формат ссылки');
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
    name: Joi.string().min(2).max(30),
  }),
});

// Валидатор для обновления профиля пользователя
const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
  }),
});

// Валидатор для добавления фильма
const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(3).max(85),
    director: Joi.string().min(2).max(30),
    duration: Joi.number().min(1).max(8),
    year: Joi.string().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateUrl),
    trailerLink: Joi.string().required().custom(validateUrl),
    thumbnail: Joi.string().required().custom(validateUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// Валидатор для проверки id фильма
const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateLogIn,
  validateUser,
  validateUpdateProfile,
  validateMovie,
  validateMovieId,
};
