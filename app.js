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

// Задаем порт по умолчанию
const { PORT = 3000 } = process.env;

// Запускаем приложение
const app = express();

// Подключаем базу данных
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// Задаем настройки для body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Сообщаем, какой порт слушать
app.listen(PORT, () => {
  console.log(`Listening ${PORT}`);
});
