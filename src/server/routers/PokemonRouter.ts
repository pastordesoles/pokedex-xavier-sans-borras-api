/* eslint-disable new-cap */
import express from "express";
import { getAllPokemon } from "../controllers/pokemonControllers/pokemonControllers";
import routes from "./routes";

const { list } = routes;

const pokemonRouter = express.Router();

pokemonRouter.get(list, getAllPokemon);

export default pokemonRouter;
