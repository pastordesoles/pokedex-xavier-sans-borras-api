import CustomError from "./CustomError.js";

const errorsMessageSet = {
  notFoundError: new CustomError(
    "Endpoint not found",
    "Endpoint not found",
    404
  ),

  code404: 404,
  code401: 401,
  code500: 500,
};

export default errorsMessageSet;
