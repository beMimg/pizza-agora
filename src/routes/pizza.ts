import express, { Router } from "express";
import { authJwt } from "../middleware/jwtStrategy";
import {
  createPizza,
  pizzaValidation,
  editPizza,
  getAllPizzas,
  deletePizza,
} from "../controllers/pizza";

const router: Router = express.Router();

router.get("/", getAllPizzas);

router.post("/", authJwt, pizzaValidation, createPizza);

router.put("/:id", authJwt, pizzaValidation, editPizza);

router.delete("/:id", authJwt, deletePizza);

export default router;
