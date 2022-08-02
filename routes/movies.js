// ============================================================================
//                            Роуты для фильмов
// ============================================================================

// ======================== Импортируем все необходимое =======================

// Импортируем метод для роутинга
const moviesRoutes = require('express').Router();

// Импортируем контроллеры фильмов
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// Импортируем функции валидации
const {
  validateMovie,
  validateMovieId,
} = require('../middlewares/validation');

// ====================== Создаем роуты для пользователя ======================

// Роут, который возвращает все сохранённые текущим  пользователем фильмы
moviesRoutes.get('/', getMovies);

// Роут, который создаёт фильм с переданными в теле данными
moviesRoutes.post('/', validateMovie, createMovie);

// Роут, который удаляет сохраненный фильм по id
moviesRoutes.delete('/:movieId', validateMovieId, deleteMovie);

// Экспортируем роуты
module.exports = moviesRoutes;
