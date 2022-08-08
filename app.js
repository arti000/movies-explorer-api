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
const ServerError = require('./errors/server-err');

// Импортируем мидлвэр CORS
const cors = require('./middlewares/cors');

// Подключаем роуты
const router = require('./routes/index');

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

// Роутинг
app.use('/', router);

// Подключаем логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());
app.use(ServerError);

// Сообщаем, какой порт слушать
app.listen(PORT);
