import dotenv from "dotenv";

dotenv.config();

interface Environment {
  port: number;
  debug: string;
  uri: string;
}

const { PORT: port, DEBUG: debug, MONGODB_URL: uri } = process.env;

export const environment: Environment = {
  // eslint-disable-next-line no-implicit-coercion
  port: +port,
  debug,
  uri,
};
