import express from "express";
import "express-async-errors";

import { ErrorMiddleware } from "../errors/ErrorMiddleware";
import { router } from "../routes";

const app = express();
const errorMiddleware = new ErrorMiddleware();

app.use(express.json());
app.use(router);
app.use(errorMiddleware.handle);

export { app };
