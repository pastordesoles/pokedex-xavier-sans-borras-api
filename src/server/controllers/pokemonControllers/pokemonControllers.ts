import type { NextFunction, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import type { CustomRequest } from "./types";

import { Favourite } from "../../../database/models/Favourites.js";

export const getAllPokemon = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const pokemon = await Favourite.find().exec();
    res.status(200).json({ pokemon });
  } catch (error: unknown) {
    const mongooseError = new CustomError(
      (error as Error).message,
      "Can't retrieve any favourite Pokemon",
      404
    );
    next(mongooseError);
  }
};
