import express, { Router } from "express";
import { authJwt } from "../middleware/jwtStrategy";
import {
  createPizza,
  pizzaValidation,
  editPizza,
  getAllPizzas,
} from "../controllers/pizza";

const router: Router = express.Router();

router.get("/", getAllPizzas);

router.post("/", authJwt, pizzaValidation, createPizza);

router.put("/:id", authJwt, pizzaValidation, editPizza);

export default router;
