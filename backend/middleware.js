const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./config");

async function authMiddleware(req, res, next) {
  const info = req.headers.authorization;
  if (!info || !(info.startsWith("Bearer "))) {
    return res.status(500).json({ message: "Invalid authentication format" });
  }
  const infoBreak = info.split(" ");
  const token = infoBreak[1];
  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    }
  } catch (e) {
    return res.status(403).json({ message: "Invalid authentication token",e });
  }
}

module.exports = {
  authMiddleware,
};
