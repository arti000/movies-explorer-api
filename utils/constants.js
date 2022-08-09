// ----------------------------------------------------------------------------
//                          Файл констант приложения
// ----------------------------------------------------------------------------

const AUTHORIZATION_REQUIRED = 'Необходима авторизация';
const MOVIE_DATA_INCORRECT = 'Переданы некорректные данные при добавлении фильма';
const MOVIE_NOT_FOUND = 'Передан несуществующий _id фильма';
const FORBIDDEN_TO_DELETE = 'Чужие фильмы удалять запрещено';
const MOVIE_DELETED = 'Фильм удален';
const URL_INCORRECT = 'Неверный формат ссылки';
const PAGE_NOT_FOUND = 'Страница не найдена';
const SERVER_ERROR = 'На сервере произошла ошибка';
const EMAIL_INCORRECT = 'Неверно указан адрес электронной почты';
const EMAIL_OR_PASSWORD_INVALID = 'Неправильные почта или пароль';
const POSTER_URL_INCORRECT = 'Неверно указана ссылка на постер к фильму';
const THUMBNAIL_LINK_INCORRECT = 'Неверно указана ссылка на миниатюрное изображение постера к фильму';
const TRAILER_URL_INCORRECT = 'Неверно указана ссылка на трейлер фильма';
const AUTHORIZATION_SUCCESSFUL = 'Авторизация прошла успешно';
const USER_DATA_INCORRECT = 'Переданы некорректные данные пользователя';
const EMAIL_CONFLICT = 'Пользователь с таким email уже существует';
const TOKEN_DELETED = 'Токен удален';
const USER_NOT_FOUND = 'Пользователь не найден';
const SIGN_UP_SUCCESSFUL = 'Вы успешно зарегистрировались';

module.exports = {
  MOVIE_DATA_INCORRECT,
  MOVIE_NOT_FOUND,
  FORBIDDEN_TO_DELETE,
  MOVIE_DELETED,
  AUTHORIZATION_SUCCESSFUL,
  USER_DATA_INCORRECT,
  EMAIL_CONFLICT,
  TOKEN_DELETED,
  USER_NOT_FOUND,
  AUTHORIZATION_REQUIRED,
  URL_INCORRECT,
  POSTER_URL_INCORRECT,
  TRAILER_URL_INCORRECT,
  THUMBNAIL_LINK_INCORRECT,
  EMAIL_INCORRECT,
  EMAIL_OR_PASSWORD_INVALID,
  PAGE_NOT_FOUND,
  SERVER_ERROR,
  SIGN_UP_SUCCESSFUL,
};
