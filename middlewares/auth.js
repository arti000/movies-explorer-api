// ----------------------------------------------------------------------------
//                            Миддлвэр авторизации
// ----------------------------------------------------------------------------

// =================== Подключаем все необходимые инструменты =================

// Подключаем модуль для создания токена
const jwt = require('jsonwebtoken');

// Импортируем ошибки
const UnauthorizedError = require('../errors/unauthorized-err');

// Импортируем переменные окружения
const { JWT_SECRET } = require('../config');

// Импортируем текст сообщений
const { AUTHORIZATION_REQUIRED } = require('../utils/constants');

// ----------------------------------------------------------------------------
//                            Экспортируем миддлвэр
// ----------------------------------------------------------------------------
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError(AUTHORIZATION_REQUIRED);
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    res.clearCookie('jwt', {
      sameSite: 'none',
      secure: true,
    });
    throw new UnauthorizedError(AUTHORIZATION_REQUIRED);
  }

  req.user = payload;

  next();
};
