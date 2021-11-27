import { Request, Response, NextFunction } from "express";

import { AppError } from "./AppError";

export class ErrorMiddleware {
  public handle(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
}
