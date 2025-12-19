import { Express, Request, Response } from "express";
import authRoutes from "./AuthRoutes";
import userRoutes from "./UserRoutes";
import bookRoutes from "./BookRoutes";
import cardRoutes from "./LibraryCardRoutes";
import loanRoutes from "./LoanRecordRoutes"

export function registerRoutes(app: Express) {

  app.use("/book", bookRoutes);

  app.use("/auth", authRoutes);

  app.use("/users", userRoutes);
  app.use("/card", cardRoutes);
  app.use("/loan", loanRoutes);
}
