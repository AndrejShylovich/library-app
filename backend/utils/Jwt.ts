import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { config } from "../config";

const JWT_SECRET = config.jwt.secret;
if (!JWT_SECRET) throw new Error("JWT secret is not defined");

const expiresIn: SignOptions["expiresIn"] = config.jwt.expiresIn as SignOptions["expiresIn"];

export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): string | JwtPayload {
  return jwt.verify(token, JWT_SECRET);
}
