import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import indexRoute from "./routes/index";
import passport from "passport";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server running on port http://localhost:3000/");
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("error", (error: Error) => console.log(error));
mongoose.connection.on("connected", () =>
  console.log("connected to mongodb database")
);

app.use("/", indexRoute);
