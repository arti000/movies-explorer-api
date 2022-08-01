// ----------------------------------------------------------------------------
//                         Основной файл приложения
// ----------------------------------------------------------------------------

// =================== Подключаем все необходимые инструменты =================

// Подключаем Express
const express = require('express');

// Подключаем ODM - Mongoose
const mongoose = require('mongoose');

// Подключаем парсер для объединения пакетов
const bodyParser = require('body-parser');

// ======================= Задаем настройки приложения ========================

// Задаем порт по умолчанию
const { PORT = 3000 } = process.env;

// Запускаем приложение
const app = express();

// Подключаем базу данных
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

// Задаем настройки парсера

// для собирания JSON-формата
app.use(bodyParser.json());

// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

// Сообщаем, какой порт слушать
app.listen(PORT, () => {
  console.log(`Listening ${PORT}`);
});
