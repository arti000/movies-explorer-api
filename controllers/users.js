// ============================================================================
//
//                            Контроллеры пользователя
//
// ============================================================================

// ======================== Импортируем все необходимое =======================

// Подключаем модуль для хэширования пароля
const bcrypt = require('bcryptjs');

// Подключаем модуль для создания токена
const jwt = require('jsonwebtoken');

// импортируем модель пользователя
const User = require('../models/user');

// Импортируем переменные окружения
const { JWT_SECRET } = require('../config');

// Импортируем ошибки
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');

// Импортируем текст сообщений
const {
  AUTHORIZATION_SUCCESSFUL,
  USER_DATA_INCORRECT,
  EMAIL_CONFLICT,
  TOKEN_DELETED,
  USER_NOT_FOUND,
  SIGN_UP_SUCCESSFUL,
} = require('../utils/constants');

// ----------------------------------------------------------------------------
//             Контроллер для входа пользователя на сайт (signin)
// ----------------------------------------------------------------------------

const logIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Создаем токен
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
      // Отправляем токен в куку
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          sameSite: 'none',
          httpOnly: true,
          secure: true,
        })
        .send({ message: AUTHORIZATION_SUCCESSFUL });
    })
    .catch((err) => {
      // ошибка аутентификации
      next(err);
    });
};

// ----------------------------------------------------------------------------
//          Контроллер для регистрации пользователя на сайте (signup)
// ----------------------------------------------------------------------------

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.status(200).send({ message: SIGN_UP_SUCCESSFUL }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(USER_DATA_INCORRECT));
      }
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_CONFLICT));
      }
      return next(err);
    });
};

// ----------------------------------------------------------------------------
//            Контроллер для выхода пользователя с сайта (signout)
// ----------------------------------------------------------------------------

const logOut = (req, res) => {
  res.clearCookie('jwt', {
    sameSite: 'none',
    secure: true,
  })
    .send({ message: TOKEN_DELETED });
};

// ----------------------------------------------------------------------------
//             Контроллер для получения информации о пользователе
// ----------------------------------------------------------------------------

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

// ----------------------------------------------------------------------------
//                 Контроллер для обновления профиля пользователя
// ----------------------------------------------------------------------------

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(USER_DATA_INCORRECT));
      }
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_CONFLICT));
      }
      return next(err);
    });
};

// ========================= Экспортируем контроллеры =========================
module.exports = {
  createUser,
  logIn,
  getUserInfo,
  updateProfile,
  logOut,
};
