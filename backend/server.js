import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import "./db/db.js"


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000; 

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  return res.json({
    message: "running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
