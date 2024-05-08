import express, { Request, Response, Router } from "express";
import pizzaRouter from "./pizza";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

router.use("/pizza", pizzaRouter);

export default router;
