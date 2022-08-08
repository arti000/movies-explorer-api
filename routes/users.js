// ============================================================================
//                            Роуты для пользователя
// ============================================================================

// ======================== Импортируем все необходимое =======================

// Импортируем метод для роутинга
const userRoutes = require('express').Router();

// Импортируем контроллеры пользователя
const {
  getUserInfo,
  updateProfile,
} = require('../controllers/users');

// Импортируем функции валидации
const {
  validateUpdateProfile,
  validationId,
} = require('../middlewares/validation');

// ====================== Создаем роуты для пользователя ======================

// Роут, который возвращает информацию о пользователе
userRoutes.get('/me', validationId, getUserInfo);

// Роут, который обновляет информацию о пользователе
userRoutes.patch('/me', validateUpdateProfile, updateProfile);

// Экспортируем роуты
module.exports = userRoutes;
