import { Favourite } from "../../../database/models/Favourites";
import { addOneFavourite, getAllPokemon } from "./pokemonControllers";
import type { NextFunction, Response } from "express";
import type { CustomRequest } from "./types";
import { getRandomFavourite } from "../../../factories/pokemonFactory";

afterEach(() => {
  jest.clearAllMocks();
});

const host = "localhost:3000";

const req: Partial<CustomRequest> = {
  protocol: "http",
  get: jest.fn().mockReturnValue(host),
};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe("Given a getAllPokemon controller", () => {
  describe("When it receives a custom request and there is an error getting the list", () => {
    test("Then it should call its method next", async () => {
      Favourite.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue("Error"),
      });

      await getAllPokemon(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a addOneFavourite controller", () => {
  describe("When it receives a request", () => {
    test("Then it should invoke its response with status 201 and the newly added Pokemon", async () => {
      const expectedStatus = 201;
      const pokemon = getRandomFavourite();
      const expectedResponse = { ...pokemon };

      req.body = pokemon;

      Favourite.create = jest.fn().mockReturnValueOnce({
        ...pokemon,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        toJSON: jest.fn().mockReturnValueOnce(pokemon),
      });

      await addOneFavourite(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ expectedResponse });
    });
  });

  describe("When it receives a request and Pokemon create rejects", () => {
    test("Then next should be invoked with an error", async () => {
      const error = new Error();

      Favourite.create = jest.fn().mockRejectedValue(error);

      await addOneFavourite(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
