import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/Jwt";

export interface AuthRequest extends Request {
  user?: { _id: string; email: string; type: string };
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token is missing" });
    return;
  }

  try {
    const payload = verifyToken(token) as {
      _id: string;
      email: string;
      type: string;
    };
    req.user = payload;
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}
