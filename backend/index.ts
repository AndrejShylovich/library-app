import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config";
import { registerRoutes } from "./routes";

const PORT = config.server.port;
const app: Express = express();

app.use(express.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? `${process.env.FRONTEND_URL}`
        : [`${process.env.FRONTEND_LOCAL_REACT_APP_URL}`, `${process.env.FRONTEND_LOCAL_VITE_URL}`],
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running!" });
});

app.get("/health", async (req: Request, res: Response) => {
  const mongoState = mongoose.connection.readyState; 

  if (mongoState === 1) {
    res.status(200).json({
      status: "ok",
      uptime: process.uptime(),
      mongo: "connected",
    });
  } else {
    res.status(503).json({
      status: "error",
      message: "MongoDB not connected",
      mongoState,
    });
  }
});

async function startServer() {
  try {
    await mongoose.connect(config.mongo.url, {
      w: "majority",
      retryWrites: true,
      authMechanism: "DEFAULT",
    });
    console.log("✅ Database connection successful");

    registerRoutes(app);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    app.use(
      (err: any, req: Request, res: Response, next: Function) => {
        console.error("Error occurred:", err);
        res.status(500).json({
          message: "Internal server error",
          error: err.message,
        });
      },
    );
  } catch (error) {
    console.error(
      "❌ Failed to connect to the server or database",
      error,
    );
    process.exit(1);
  }
}

startServer();
