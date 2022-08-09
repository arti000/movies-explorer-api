// ============================================================================
//                              Все роуты приложения
// ============================================================================

// ======================== Импортируем все необходимое =======================

// Импортируем метод для роутинга
const router = require('express').Router();

// Импортируем роуты пользователя
const userRoutes = require('./users');

// Импортируем роуты для фильмов
const moviesRoutes = require('./movies');

// Импортируем мидлвэр авторизации
const auth = require('../middlewares/auth');

// Импортируем контроллеры для регистрации, входа и выхода пользователя на сайте
const { createUser, logIn, logOut } = require('../controllers/users');

// Импортируем файлы ошибок
const NotFoundError = require('../errors/not-found-err');

// Импортируем мидлвэр валидации
const { validateLogIn, validateUser } = require('../middlewares/validation');

// Импортируем текст сообщений
const { PAGE_NOT_FOUND } = require('../utils/constants');

// ======================= Задаем настройки роутинга =========================

// Роуты, не требующие авторизации
router.post('/signin', validateLogIn, logIn);
router.post('/signup', validateUser, createUser);

// Мидлвэр авторизации
router.use(auth);

// Роуты, которым нужна авторизация
router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);
router.get('/signout', logOut);
router.use('*', () => {
  throw new NotFoundError(PAGE_NOT_FOUND);
});

module.exports = router;
