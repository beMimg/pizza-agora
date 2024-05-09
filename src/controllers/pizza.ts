import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { pizzaModel } from "../models/pizza";

const createPizza = async (req: Request, res: Response) => {
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

const getAllPizzas = async (req: Request, res: Response) => {
  try {
    const pizzas = await pizzaModel.find();

    if (!pizzas) {
      return res.status(404).json({ message: "This list is currently empty" });
    }
    res.status(200).json({ pizzas });
  } catch (err) {
    console.error("Error", err);
  }
};

const editPizza = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  try {
    const { pizzaName, price, ingredients, image } = req.body;

    const pizza = await pizzaModel.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }

    pizza.pizzaName = pizzaName;
    pizza.price = price;
    pizza.ingredients = ingredients;
    pizza.image = image;

    await pizza.save();

    res.status(200).json({ pizza });
  } catch (err) {
    console.error("Error", err);
  }
};

export { createPizza, pizzaValidation, getAllPizzas, editPizza };
