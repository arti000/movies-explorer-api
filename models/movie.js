// ----------------------------------------------------------------------------
//                            Схема модели фильма
// ----------------------------------------------------------------------------

// Подключаем ODM - Mongoose
const mongoose = require('mongoose');

// Импортируем валидатор в проект
const validator = require('validator');

// Импортируем текст сообщений
const { POSTER_URL_INCORRECT, TRAILER_URL_INCORRECT, THUMBNAIL_LINK_INCORRECT } = require('../utils/constants');

// Создаем схему фильма
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minLength: 1,
    maxLength: 100,
  },
  director: {
    type: String,
    minLength: 1,
    maxLength: 100,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    maxLength: 4,
  },
  description: {
    type: String,
    minLength: 2,
    maxLength: 1000,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: POSTER_URL_INCORRECT,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(trailerLink) {
        return validator.isURL(trailerLink);
      },
      message: TRAILER_URL_INCORRECT,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(thumbnail) {
        return validator.isURL(thumbnail);
      },
      message: THUMBNAIL_LINK_INCORRECT,
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
    minLength: 1,
    maxLength: 100,
  },
  nameEN: {
    type: String,
    minLength: 1,
    maxLength: 100,
  },
});

module.exports = mongoose.model('movie', movieSchema);
