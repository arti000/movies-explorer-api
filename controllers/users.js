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
const { NODE_ENV, JWT_SECRET } = process.env;

// Импортируем ошибки
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');

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
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
      // Отправляем токен в куку
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          sameSite: true,
          httpOnly: true,
        })
        .send({ message: 'Авторизация прошла успешно', token });
    })
    .catch(() => {
      // ошибка аутентификации
      next(new UnauthorizedError('Неверные почта или пароль'));
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
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        return next(new ConflictError(`Пользователь с таким email ${req.body.email} уже существует`));
      }
      return next(err);
    });
};

// ----------------------------------------------------------------------------
//            Контроллер для выхода пользователя с сайта (signout)
// ----------------------------------------------------------------------------

const logOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'До свидания' });
};

// ----------------------------------------------------------------------------
//             Контроллер для получения информации о пользователе
// ----------------------------------------------------------------------------

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
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
        next(new BadRequestError('Переданы некорректные данные при обновлении пользователя'));
      }
      next(err);
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
