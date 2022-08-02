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
} = require('../middlewares/validation');

// ====================== Создаем роуты для пользователя ======================

// Роут, который возвращает информацию о пользователе (email и имя)
userRoutes.get('/me', getUserInfo);

// Роут, который обновляет информацию о пользователе (email и имя)
userRoutes.patch('/me', validateUpdateProfile, updateProfile);

module.exports = userRoutes;
