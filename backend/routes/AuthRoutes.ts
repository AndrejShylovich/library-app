import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { Schemas, ValidateSchema } from "../middlewares/Validation";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/register",
  ValidateSchema(Schemas.user.create, "body"),
  AuthController.handleRegister,
);

router.post(
  "/login",
  ValidateSchema(Schemas.user.login, "body"),
  AuthController.handleLogin,
);

router.post("/check-email", AuthController.handleCheckEmail);

router.get(
  "/me",
  authenticateToken,
  AuthController.handleMe,
);

export default router;
