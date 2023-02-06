/* eslint-disable no-implicit-coercion */
import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import type { FavouriteStructureWithId } from "../server/controllers/pokemonControllers/types.js";

const favouriteFactory = Factory.define<FavouriteStructureWithId>(() => ({
  abilities: { abilityOne: faker.lorem.word(), abilityTwo: faker.lorem.word() },
  height: +faker.random.numeric(1),
  id: +faker.random.numeric(1),
  image: faker.lorem.word(),
  name: faker.lorem.word(),
  types: faker.lorem.word(),
  _id: new mongoose.Types.ObjectId().toString(),
}));

export const getRandomFavourite = () => favouriteFactory.build();

export const getRandomFavouriteList = (number: number) =>
  favouriteFactory.buildList(number);
