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

// ----------------------------------------------------------------------------
//                            Экспортируем миддлвэр
// ----------------------------------------------------------------------------
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    res.clearCookie('jwt');
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
