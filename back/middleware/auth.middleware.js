const jwt = require("jsonwebtoken");

const secretKey = "project";

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded || "";
    next();
  } catch (error) {
    return res.status(401).json({ message: "Error" });
  }
};
