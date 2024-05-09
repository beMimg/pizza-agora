import express, { Request, Response, Router } from "express";
import {
  createPizza,
  pizzaValidation,
  getAllPizzas,
} from "../controllers/pizza";

const router: Router = express.Router();

router.get("/", getAllPizzas);

router.post("/", pizzaValidation, createPizza);

export default router;
