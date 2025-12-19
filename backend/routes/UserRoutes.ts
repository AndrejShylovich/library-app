import { Router } from 'express';
import UserController from '../controllers/UserController';
import { Schemas, ValidateSchema } from '../middlewares/Validation';

const router = Router();

// Получение всех пользователей
router.get('/', UserController.getAllUsers);

// Получение пользователя по ID
router.get(
  '/:userId',
  ValidateSchema(Schemas.user.userId, 'params'),
  UserController.getUserById
);

// Обновление пользователя
router.put(
  '/',
  ValidateSchema(Schemas.user.update, 'body'),
  UserController.updateUser
);

// Удаление пользователя
router.delete(
  '/',
  ValidateSchema(Schemas.user.userId, 'params'),
  UserController.deleteUser
);

export default router;
