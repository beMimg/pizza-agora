import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { pizzaModel } from "../models/pizza";

const createPizza = async (req: Request, res: Response) => {
  console.log("hi");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  try {
    const { pizzaName, price, ingredients, image } = req.body;

    const pizza = new pizzaModel({
      pizzaName,
      price,
      ingredients,
      image,
    });

    await pizza.save();
    res.status(201).json({ pizza });
  } catch (err) {
    console.log("error");
  }
};

const pizzaValidation = [
  body("pizzaName").isString().trim().escape(),
  body("price").isNumeric(),
  body("ingredients").isArray(),
  body("image").optional().isString(),
];

export { createPizza, pizzaValidation };
