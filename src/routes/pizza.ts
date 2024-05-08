import express, { Request, Response, Router } from "express";
import { createPizza, pizzaValidation } from "../controllers/pizza";

const router: Router = express.Router();

router.post("/", pizzaValidation, createPizza);

export default router;
