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

// ----------------------------------------------------------------------------
//                          Создаем схему пользователя
// ----------------------------------------------------------------------------

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Неверно указан адрес электронной почты'],
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
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      // Cравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем запрос
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
