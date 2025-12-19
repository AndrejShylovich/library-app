import dotenv from "dotenv";

dotenv.config();

const {
  MONGO_URL = "",
  MONGO_LOCAL_URL = "",
  SERVER_PORT,
  SERVER_ROUNDS,
} = process.env;


const mongoUrl: string = MONGO_URL || MONGO_LOCAL_URL;
const port: number = SERVER_PORT ? Number(SERVER_PORT) : 8000;
const rounds: number = SERVER_ROUNDS
  ? Number(SERVER_ROUNDS)
  : Math.floor(Math.random() * 11);

export const config = {
  mongo: {
    url: mongoUrl,
  },
  server: {
    port,
    rounds,
  },
};
