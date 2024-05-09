import express, { Request, Response, Router } from "express";
import {
  createPizza,
  pizzaValidation,
  getAllPizzas,
} from "../controllers/pizza";
import { authJwt } from "../middleware/jwtStrategy";

const router: Router = express.Router();

router.get("/", getAllPizzas);

router.post("/", authJwt, pizzaValidation, createPizza);

export default router;
