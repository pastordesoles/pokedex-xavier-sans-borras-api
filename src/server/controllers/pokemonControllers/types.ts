import type { Request } from "express";
import type * as core from "express-serve-static-core";
import type { FavouriteStructure } from "../../../database/models/Favourites.js";

export interface CustomRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any
> extends Request<P, ResBody, ReqBody> {
  userId: string;
}

export interface SessionStructureWithId extends FavouriteStructure {
  _id: string;
}
