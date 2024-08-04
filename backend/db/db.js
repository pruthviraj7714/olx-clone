import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.MONGODB_URL;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
