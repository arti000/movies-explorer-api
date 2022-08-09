// ----------------------------------------------------------------------------
//                            Миддлвэр авторизации
// ----------------------------------------------------------------------------

// =================== Подключаем все необходимые инструменты =================

// Подключаем модуль для создания токена
const jwt = require('jsonwebtoken');

// Импортируем ошибки
const UnauthorizedError = require('../errors/unauthorized-err');

// Импортируем переменные окружения
const { NODE_ENV, JWT_SECRET } = process.env;

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
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    res.clearCookie('jwt');
    throw new UnauthorizedError(AUTHORIZATION_REQUIRED);
  }

  req.user = payload;

  next();
};
