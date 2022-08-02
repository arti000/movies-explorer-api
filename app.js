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

// Подключаем роуты
const userRoutes = require('./routes/users');

// Импортируем контроллеры для регистрации, входа и выхода пользователя на сайте
const { createUser, logIn, logOut } = require('./controllers/users');

// Импортируем функции валидации
const { validateLogIn, validateUser } = require('./middlewares/validation');

// ======================= Задаем настройки приложения ========================

// Задаем порт по умолчанию
const { PORT = 3000 } = process.env;

// Запускаем приложение
const app = express();

// Подключаем базу данных
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

// ======================= Задаем настройки парсеров =========================

// для собирания JSON-формата
app.use(bodyParser.json());

// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

// для парсинга данных из кук
app.use(cookieParser());

// ======================= Задаем настройки роутинга =========================

// Роуты, не требующие авторизации
app.post('/signin', validateLogIn, logIn);
app.post('/signup', validateUser, createUser);

// Мидлвэр авторизации

// Роуты, которым нужна авторизация
app.use('/users', userRoutes);
app.get('/signout', logOut);
app.use('*', (req, res) => {
  throw new NotFoundError('Страница не найдена');
});

// Обработчик ошибок celebrate
app.use(errors());
app.use(ServerError);

// Сообщаем, какой порт слушать
app.listen(PORT, () => {
  console.log(`Listening ${PORT}`);
});
