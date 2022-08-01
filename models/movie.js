// ----------------------------------------------------------------------------
//                            Схема модели фильма
// ----------------------------------------------------------------------------

// Подключаем ODM - Mongoose
const mongoose = require('mongoose');

// Импортируем валидатор в проект
const validator = require('validator');

// Создаем схему фильма
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: 'Неверно указана ссылка на постер к фильму',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(trailerLink) {
        return validator.isURL(trailerLink);
      },
      message: 'Неверно указана ссылка на трейлер фильма',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(thumbnail) {
        return validator.isURL(thumbnail);
      },
      message: 'Неверно указана ссылка на трейлер фильма',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      function(nameRU) {
        // Не позволит пользователю добавить лишние символы в название фильма
        return /[a-яa-z0-9\-\s]/gi.test(nameRU);
      },
      message: 'Название содержит недопустимые символы',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      function(nameEN) {
        // Не позволит пользователю добавить лишние символы в название фильма
        return /[a-z0-9\-\s]/gi.test(nameEN);
      },
      message: 'Название содержит недопустимые символы',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
