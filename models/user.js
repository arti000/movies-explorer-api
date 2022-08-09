// ============================================================================
//                            Схема модели пользователя
// ============================================================================

// ======================== Импортируем все необходимое =======================

// Подключаем ODM - Mongoose
const mongoose = require('mongoose');

// Подключаем модуль для хэширования пароля
const bcrypt = require('bcryptjs');

// Импортируем валидатор в проект
const validator = require('validator');

// Импортируем класс ошибки
const UnauthorizedError = require('../errors/unauthorized-err');

// Импортируем текст сообщений
const { EMAIL_INCORRECT, EMAIL_OR_PASSWORD_INVALID } = require('../utils/constants');

// ----------------------------------------------------------------------------
//                          Создаем схему пользователя
// ----------------------------------------------------------------------------

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, EMAIL_INCORRECT],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

// Меняем стандартное поведение модели и добавляем функцию,
// которая будет возвращать хэш пароля из базы данных при аутентификации
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError({ message: EMAIL_OR_PASSWORD_INVALID });
      }
      // Cравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем запрос
            throw new UnauthorizedError({ message: EMAIL_OR_PASSWORD_INVALID });
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
