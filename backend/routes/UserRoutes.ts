import { Router } from 'express';
import UserController from '../controllers/UserController';
import { Schemas, ValidateSchema } from '../middlewares/Validation';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, UserController.getAllUsers);

router.get(
  '/:userId',
  ValidateSchema(Schemas.user.userId, 'params'),
  authenticateToken,
  UserController.getUserById
);

router.put(
  '/',
  ValidateSchema(Schemas.user.update, 'body'),
  authenticateToken,
  UserController.updateUser
);

router.delete(
  '/',
  ValidateSchema(Schemas.user.userId, 'params'),
  authenticateToken,
  UserController.deleteUser
);

export default router;
