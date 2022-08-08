# Проект Movies. Бэкенд.
____

![JavaScript](https://img.shields.io/badge/-JavaScript-f3de35?logo=javaScript&logoColor=black)
![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
![Node](https://img.shields.io/badge/-Node.js-469837?logo=Node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-56a14b?logo=mongodb`&logoColor=`white)
![API](https://img.shields.io/badge/-API-blue)
![Visual Studio Code](https://img.shields.io/badge/-Visual%20Studio%20Code-blue?logo=Visual%20Studio%20Code)


## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и фильмов   
`/models` — папка с файлами описания схем пользователя и фильмов  
`/middlewares` — папка с файлами миддлверов  
`/errors` — папка с файлами ошибок

## Роуты
Для пользователей:</br>
```sh
GET /users/me — возвращает информацию о пользователе (email и имя)
PATCH /users/me — обновляет информацию о пользователе (email и имя)
POST /signup — создаёт пользователя с переданными в теле данными
POST /signin — проверяет переданные в теле данные и возвращает JWT
```
Для фильмов:</br>
```sh
GET /movies — возвращает все сохранённые текущим  пользователем фильмы
POST /movies — создаёт фильм с переданными в теле данными
DELETE /movies/:movieId — удаляет сохранённый фильм по id
```


## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

###
[![Link to repository](https://img.shields.io/badge/-Репозиторий%20с%20бэкендом%20Movies%20Arti000%20-black?logo=GitHub)](https://github.com/arti000)
[![Link to SSL Report](https://img.shields.io/badge/-Проверка%20SSL%20сертификата%20-ed2e26?logo=Qualys)](https://www.ssllabs.com/ssltest/analyze.html?d=diploma.app.nomoredomains.sbs)

Публичный IPv4: 62.84.116.80  
Домен: https://diploma.app.nomoredomains.sbs/
