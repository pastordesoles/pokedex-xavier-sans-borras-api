/* eslint-disable new-cap */
import express from "express";
import {
  getAllPokemon,
  addOneFavourite,
  deleteOneFavourite,
} from "../controllers/pokemonControllers/pokemonControllers.js";
import routes from "./routes.js";

const { list, addPokemon, deletePokemon } = routes;

const pokemonRouter = express.Router();

pokemonRouter.get(list, getAllPokemon);
pokemonRouter.post(addPokemon, addOneFavourite);
pokemonRouter.delete(deletePokemon, deleteOneFavourite);

export default pokemonRouter;
