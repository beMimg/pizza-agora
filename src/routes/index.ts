import express, { Request, Response, Router } from "express";
import pizzaRouter from "./pizza";
import authRouter from "./auth";
import { authJwt } from "../middleware/jwtStrategy";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

router.use("/pizza", authJwt, pizzaRouter);
router.use("/auth", authRouter);

export default router;
