import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import { Favourite } from "../../database/models/Favourites";
import connectDb from "../../database/connectDb";
import routes from "./routes";
import app from "../app";
import {
  getRandomFavourite,
  getRandomFavouriteList,
} from "../../factories/pokemonFactory";

const { pokemonEndpoint, list } = routes;

const pokemonListEndpoint = `${pokemonEndpoint}${list}`;
const deletePokemon = `${pokemonEndpoint}/delete`;

let server: MongoMemoryServer;

const favouritesList = getRandomFavouriteList(10);

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDb(server.getUri());
});

afterEach(async () => {
  await Favourite.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET /pokemon/list endpoint", () => {
  describe("When it receives a request 10 Pokemon in the database", () => {
    test("Then it should respond with a list of 10 Pokemon and status 200", async () => {
      const expectedStatus = 200;

      await Favourite.create(favouritesList);

      const response = await request(app)
        .get(`${pokemonListEndpoint}`)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("pokemon");
      expect(response.body.pokemon).toHaveLength(10);
    });
  });

  describe("When it receives a request from a non-allowed origin", () => {
    test("Then it should respond with an error and status 500", async () => {
      const expectedStatus = 500;

      const response = await request(app)
        .get(pokemonListEndpoint)
        .set("Origin", "http://allowed.com")
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error");
    });
  });
});

describe("Given a DELETE /pokemon/delete/:id endpoint", () => {
  describe("When it receives a request with a valid Pokemon id", () => {
    test("Then it should call the response method status with a 200", async () => {
      const expectedStatus = 200;

      const favourite = getRandomFavourite();

      await Favourite.create(favourite);

      await request(app)
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        .delete(`/pokemon/delete/${favourite._id as string}`)
        .set("Content-Type", "application/json")
        .expect(expectedStatus);
    });
  });

  describe("When it receives a request with an invalid Pokemon id '123456'", () => {
    test("Then it should call the response method status with a 500 and an error", async () => {
      const expectedStatus = 500;
      const sessionId = "123456";

      const response = await request(app)
        .delete(`${deletePokemon}/${sessionId}`)
        .set("Content-Type", "application/json")
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error");
    });
  });
});

describe("Given a POST /pokemon/add endpoint", () => {
  describe("When it receives a request with a valid Pokemon", () => {
    test("Then it should call the response method status with a 201", async () => {
      const expectedStatus = 201;

      const favourite = getRandomFavourite();

      await request(app)
        .post(`/pokemon/add`)
        .send(favourite)
        .expect(expectedStatus);
    });
  });

  describe("When it receives a request with a duplicated Pokemon", () => {
    test("Then it should call the response method status with a 400 and an error", async () => {
      const expectedStatus = 400;
      const favourite = getRandomFavourite();
      await Favourite.create(favourite);

      const response = await request(app)
        .post(`/pokemon/add`)
        .send(favourite)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("message");
    });
  });

  describe("When it receives an invalid request", () => {
    test("Then it should call the response method status with a 500 and an error", async () => {
      const expectedStatus = 500;

      const response = await request(app)
        .post(`/pokemon/add`)
        .send("")
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error");
    });
  });
});
