// ----------------------------------------------------------------------------
//                            Файл конфигуратор
// ----------------------------------------------------------------------------

const {
  PORT = 3000,
  MONGO_DB = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET = 'jwt_secret',
} = process.env;

module.exports = {
  PORT,
  MONGO_DB,
  JWT_SECRET,
};
