const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  return res.json({
    message: "running",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
