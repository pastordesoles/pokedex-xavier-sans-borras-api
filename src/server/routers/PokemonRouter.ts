/* eslint-disable new-cap */
import express from "express";
import { getAllPokemon } from "../controllers/pokemonControllers/pokemonControllers.js";
import routes from "./routes.js";

const { list } = routes;

const pokemonRouter = express.Router();

pokemonRouter.get(list, getAllPokemon);

export default pokemonRouter;
