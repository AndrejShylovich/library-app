import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { Schemas, ValidateSchema } from '../middlewares/Validation';

const router = Router();

// Регистрация пользователя
router.post(
  "/register",
  ValidateSchema(Schemas.user.create, 'body'),
  AuthController.handleRegister
);

// Логин пользователя
router.post(
  "/login",
  ValidateSchema(Schemas.user.login, 'body'),
  AuthController.handleLogin
);

router.post("/check-email", AuthController.handleCheckEmail);

export default router;
