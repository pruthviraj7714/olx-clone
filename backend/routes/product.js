import { Router } from "express";
import { Product } from "../models/productModel.js";
import { authMiddleware } from "../middleware.js";
import { productSchema } from "../schema/schema.js";
import multer from "multer";
import fs from "fs";
import path from "path";

export const productRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("file");

// Upload endpoint
productRouter.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    res.status(200).json({ url: fileUrl });
  });
});

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
