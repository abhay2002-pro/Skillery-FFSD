import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookieParser"

config({
  path: "./config/config.env",
});
const app = express();

//Using middlewares

//// To read body of the request
app.use(express.json());
app.use(cookieParser)
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Importing and using routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);

export default app;
app.use(ErrorMiddleware);
