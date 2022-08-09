// ============================================================================
//
//                            Контроллеры для фильмов
//
// ============================================================================

// ======================== Импортируем все необходимое =======================

// Импортируем модель фильма
const Movie = require('../models/movie');

// Импортируем ошибки
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

// Импортируем текст сообщений
const {
  MOVIE_DATA_INCORRECT,
  MOVIE_NOT_FOUND,
  FORBIDDEN_TO_DELETE,
  MOVIE_DELETED,
} = require('../utils/constants');

// ----------------------------------------------------------------------------
//  Контроллер, который возвращает все сохраненные текущим пользователем фильмы
// ----------------------------------------------------------------------------

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// ----------------------------------------------------------------------------
//        Контроллер, который создаёт фильм с переданными в теле данными
// ----------------------------------------------------------------------------

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(MOVIE_DATA_INCORRECT));
      }
      return next(err);
    });
};

// ----------------------------------------------------------------------------
//              Контроллер, который удаляет сохранённый фильм по id
// ----------------------------------------------------------------------------

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(MOVIE_NOT_FOUND));
      } if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(FORBIDDEN_TO_DELETE));
      }
      return movie.remove()
        .then(() => res.send(MOVIE_DELETED));
    })
    .catch(next);
};

// ========================= Экспортируем контроллеры =========================
module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
