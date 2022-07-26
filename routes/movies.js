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
  validationId,
} = require('../middlewares/validation');

// ====================== Создаем роуты для пользователя ======================

// Роут, который возвращает все сохранённые текущим  пользователем фильмы
moviesRoutes.get('/', getMovies);

// Роут, который создаёт фильм с переданными в теле данными
moviesRoutes.post('/', validateMovie, createMovie);

// Роут, который удаляет сохраненный фильм по id
moviesRoutes.delete('/:_id', validationId, deleteMovie);

// Экспортируем роуты
module.exports = moviesRoutes;
