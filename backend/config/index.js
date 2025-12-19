"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MONGO_URL = "", MONGO_LOCAL_URL = "", SERVER_PORT, SERVER_ROUNDS, } = process.env;
const mongoUrl = MONGO_URL || MONGO_LOCAL_URL;
const port = SERVER_PORT ? Number(SERVER_PORT) : 8000;
const rounds = SERVER_ROUNDS
    ? Number(SERVER_ROUNDS)
    : Math.floor(Math.random() * 11);
exports.config = {
    mongo: {
        url: mongoUrl,
    },
    server: {
        port,
        rounds,
    },
};
