import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({
      message: "Authorization header missing",
    });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);

    req.id = isValid.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized User",
      error: error.message,
    });
  }
};
