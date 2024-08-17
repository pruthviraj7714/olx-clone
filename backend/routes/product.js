import { Router } from "express";
import { Product } from "../models/productModel.js";
import { authMiddleware } from "../middleware.js";
import { productSchema } from "../schema/schema.js";
import multer from "multer";
import { User } from "../models/userModel.js";
import  cloudinary from "cloudinary"

export const productRouter = Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECERT,
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("file");

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

    cloudinary.uploader
      .upload_stream(
        {
          folder: "uploads",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return res
              .status(500)
              .json({
                message: "Cloudinary upload failed",
                error: error.message,
              });
          }

          res.status(200).json({ url: result.secure_url });
        }
      )
      .end(req.file.buffer);
  });
});

productRouter.get("/all", async (req, res) => {
  try {
    const products = await Product.find({
      soldStatus: false,
    }).populate("user", "username email location");

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

    const user = await User.findById(req.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.listedProducts.push(product);
    await user.save();

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

productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id).populate(
      "user",
      "username location"
    );

    if (!product) {
      return res.status(404).json({
        message: "No Product Found",
      });
    }

    return res.json({
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

productRouter.post("/:id/wishlist", authMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    return res.status(200).json({
      message: "Product added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

productRouter.post("/:id/remove-wishlist", authMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.wishlist.includes(productId)) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
      await user.save();
    }

    return res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

productRouter.get("/:id/is-wishlisted", authMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isWishlisted = user.wishlist.includes(productId);

    return res.status(200).json({
      isWishlisted,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

productRouter.post("/:id/purchase", authMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.soldStatus) {
      return res.status(400).json({
        message: "Product already sold",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.shoppingCoins < product.price) {
      return res.status(403).json({
        message: "Insufficient Shopping Coins",
      });
    }

    const sellerUser = await User.findById(product.user);
    if (!sellerUser) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    user.shoppingCoins -= product.price;
    sellerUser.shoppingCoins += product.price;
    user.purchasedProducts.push(productId);
    await user.save();
    await sellerUser.save();

    product.soldStatus = true;
    await product.save();

    return res.status(200).json({
      message: "Product Successfully Purchased",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
