import { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";

const favouriteSchema = new Schema({
  abilities: { abilityOne: { type: String }, abilityTwo: { type: String } },
  height: { type: Number },
  id: { type: Number },
  types: { type: String },
  name: { type: String },
  image: { type: String },
});

export type FavouriteStructure = InferSchemaType<typeof favouriteSchema>;

export const Favourite = model("Favourite", favouriteSchema, "favourites");
