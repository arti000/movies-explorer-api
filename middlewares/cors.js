// ----------------------------------------------------------------------------
//                      Миддлвэр кросс-доменных запросов (CORS)
// ----------------------------------------------------------------------------

// Список разрешенных доменов
const allowedCors = [
  'http://diploma.app.nomoredomains.sbs',
  'http://api.diploma.app.nomoredomains.sbs',
  'https://diploma.app.nomoredomains.sbs',
  'https://api.diploma.app.nomoredomains.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
];

const cors = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req;

  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION';

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с ЭТОГО источника
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};

// Экспортируем миддлвэр
module.exports = cors;
