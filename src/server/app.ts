import cors from "cors";
import express from "express";
import morgan from "morgan";
import corsOptions from "./cors/corsOptions.js";
import { generalError, notFoundError } from "./errors/errors.js";
import pokemonRouter from "./routers/PokemonRouter.js";
import routes from "./routers/routes.js";

const { pokemonEndpoint } = routes;

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.disable("x-powered-by");
app.enable("trust proxy");

app.use(pokemonEndpoint, pokemonRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
