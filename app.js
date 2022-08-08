// ----------------------------------------------------------------------------
//                         Основной файл приложения
// ----------------------------------------------------------------------------

// =================== Подключаем все необходимые инструменты =================

// Подключаем модуль, позволяющий нам загружать переменные среды в наше приложение
require('dotenv').config();

// Подключаем Express
const express = require('express');

// Подключаем ODM - Mongoose
const mongoose = require('mongoose');

// Подключаем парсер для объединения пакетов
const bodyParser = require('body-parser');

// Подключаем парсер для данных из кук
const cookieParser = require('cookie-parser');

// Подключаем ошибки
const { errors } = require('celebrate');
const NotFoundError = require('./errors/not-found-err');
const ServerError = require('./errors/server-err');

// Импортируем мидлвэр CORS
const cors = require('./middlewares/cors');

// Импортируем мидлвэр авторизации
const auth = require('./middlewares/auth');

// Подключаем роуты
const userRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');

// Импортируем контроллеры для регистрации, входа и выхода пользователя на сайте
const { createUser, logIn, logOut } = require('./controllers/users');

// Импортируем мидлвэр валидации
const { validateLogIn, validateUser } = require('./middlewares/validation');

// Импортируем мидлвэр логирования
const { requestLogger, errorLogger } = require('./middlewares/logger');

// ======================= Задаем настройки приложения ========================

// Задаем порт по умолчанию
const { PORT = 3000, NODE_ENV, MONGO_DB } = process.env;

// Запускаем приложение
const app = express();

// Подключаем базу данных
mongoose.connect(
  NODE_ENV === 'production' ? MONGO_DB : 'mongodb://localhost:27017/moviesdb',
  {
    useNewUrlParser: true,
  },
);

// Подключаем мидлвэр CORS
app.use(cors);

// ======================= Задаем настройки парсеров =========================

// для собирания JSON-формата
app.use(bodyParser.json());

// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

// для парсинга данных из кук
app.use(cookieParser());

// подключаем логгер запросов
app.use(requestLogger);

// ======================= Задаем настройки роутинга =========================

// Роуты, не требующие авторизации
app.post('/signin', validateLogIn, logIn);
app.post('/signup', validateUser, createUser);

// Мидлвэр авторизации
app.use(auth);

// Роуты, которым нужна авторизация
app.use('/users', userRoutes);
app.use('/movies', moviesRoutes);
app.get('/signout', logOut);
app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

// Подключаем логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());
app.use(ServerError);

// Сообщаем, какой порт слушать
app.listen(PORT);
