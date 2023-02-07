import { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";

const favouriteSchema = new Schema({
  abilities: {
    abilityOne: { type: String, required: true },
    abilityTwo: { type: String },
  },
  height: { type: Number, required: true },
  id: { type: Number, required: true },
  types: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export type FavouriteStructure = InferSchemaType<typeof favouriteSchema>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Favourite = model("Favourite", favouriteSchema, "favourites");
