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

// Подключаем роуты пользователя
const userRoutes = require('./routes/users');

// ======================= Задаем настройки приложения ========================

// Задаем порт по умолчанию
const { PORT = 3000 } = process.env;

// Запускаем приложение
const app = express();

// Подключаем базу данных
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

// Задаем настройки парсеров

// для собирания JSON-формата
app.use(bodyParser.json());

// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

// для парсинга кук
app.use(cookieParser());

// Роуты

// Роуты, не требующие авторизации

// Мидлвэр авторизации

// Роуты, которым нужна авторизация
app.use('/users', userRoutes);

// Сообщаем, какой порт слушать
app.listen(PORT, () => {
  console.log(`Listening ${PORT}`);
});
