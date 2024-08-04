import { Router } from "express";
import { Product } from "../models/productModel.js";
import { authMiddleware } from "../middleware.js";
import { productSchema } from "../schema/schema.js";

export const productRouter = Router();

productRouter.get("/all", async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

productRouter.post("/sell", authMiddleware, async (req, res) => {
  const parsedBody = productSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      message: "Invalid Inputs",
      errors: parsedBody.error.errors,
    });
  }

  try {
    const { name, description, soldStatus, category, image, price } =
      parsedBody.data;
    const product = await Product.create({
      user: req.id,
      name,
      description,
      soldStatus,
      category,
      image,
      price,
    });

    return res.status(201).json({
      message: "Product Successfully Added to Sell",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
