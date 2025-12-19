import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config";
import { registerRoutes } from "./routes";

const PORT = config.server.port;

const app: Express = express();

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- Health check ---
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Сервер успешно запустился" });
});

// --- Start Server ---
async function startServer() {
  try {
    // Подключение к MongoDB
    await mongoose.connect(config.mongo.url, {
      w: "majority",
      retryWrites: true,
      authMechanism: "DEFAULT",
    });
    console.log("✅ Подключение к базе данных прошло успешно");

    // Регистрация маршрутов
    registerRoutes(app);

    // Запуск сервера
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
    });

    // Глобальная обработка ошибок
    app.use((err: any, req: Request, res: Response, next: Function) => {
      console.error("Произошла ошибка:", err);
      res.status(500).json({ message: "Внутренняя ошибка сервера", error: err.message });
    });

  } catch (error) {
    console.error("❌ Не удалось подключиться к серверу или базе данных", error);
    process.exit(1); // Завершаем процесс, если не удалось подключиться к БД
  }
}

startServer();
