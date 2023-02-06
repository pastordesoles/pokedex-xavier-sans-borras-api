import "../../loadEnvironment.js";
import debugCreator from "debug";
import chalk from "chalk";
import type { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import errorsMessageSet from "../../CustomError/errorsMessageSet.js";
import type CustomError from "../../CustomError/CustomError.js";

const { notFoundError: notFoundErrorMessage } = errorsMessageSet;

const debug = debugCreator("pokedex-api:server:middlewares:errors");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = notFoundErrorMessage;
  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    debug(
      chalk.red.bold(
        error.details.body.map((error) => error.message).join("\n")
      )
    );
  }

  const statusCode = error.statusCode ?? 500;
  const publicMessage = error.publicMessage || "Core meltdown";

  debug(chalk.red.bold(error.message));

  res.status(statusCode).json({ error: publicMessage });
};
