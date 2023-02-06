import type { NextFunction, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import type { CustomRequest } from "./types";
import type { FavouriteStructure } from "../../../database/models/Favourites.js";
import { Favourite } from "../../../database/models/Favourites.js";
import errorsMessageSet from "../../../CustomError/errorsMessageSet.js";

const { code404, code500, cantRetrieveFavourite, errorDeletingFavourite } =
  errorsMessageSet;

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
      cantRetrieveFavourite,
      code404
    );
    next(mongooseError);
  }
};

export const addOneFavourite = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const receivedFavourite = req.body as FavouriteStructure;

  try {
    const duplicatedPokemon = await Favourite.findOne(receivedFavourite).exec();
    if (duplicatedPokemon) {
      res.status(400).json({ message: "Pokemon already present in the list" });
      return;
    }

    const newFavourite = await Favourite.create({
      ...receivedFavourite,
    });

    res.status(201).json({
      pokemon: {
        ...newFavourite.toJSON(),
      },
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteOneFavourite = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await Favourite.findByIdAndDelete(id).exec();
    res.status(200).json({ message: "Pokemon has been deleted" });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      errorDeletingFavourite,
      code500
    );
    next(customError);
  }
};
