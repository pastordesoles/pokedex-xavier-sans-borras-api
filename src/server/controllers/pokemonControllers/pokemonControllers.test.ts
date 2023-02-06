import { Favourite } from "../../../database/models/Favourites";
import { getAllPokemon } from "./pokemonControllers";
import type { NextFunction, Response } from "express";
import type { CustomRequest } from "./types";

beforeEach(() => {
  jest.clearAllMocks();
});

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
