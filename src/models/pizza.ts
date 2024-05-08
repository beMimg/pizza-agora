import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  pizzaName: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: { type: Array, required: true },
  image: { type: String },
});
