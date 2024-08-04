import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  soldStatus: {
    type: Boolean,
    default: false,
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }
});

export const Product = mongoose.model("Product", productSchema);
