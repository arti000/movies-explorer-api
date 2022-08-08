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
        return next(new BadRequestError('Переданы некорректные данные при добавлении фильма'));
      }
      return next(err);
    });
};

// ----------------------------------------------------------------------------
//              Контроллер, который удаляет сохранённый фильм по id
// ----------------------------------------------------------------------------

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Передан несуществующий _id фильма');
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Чужие фильмы удалять запрещено'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequestError('Переданы некорректные данные для удаления фильма'));
      }
      return next(err);
    });
};

// ========================= Экспортируем контроллеры =========================
module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
