import jwt from "jsonwebtoken";

export const verifyAuth = (req, res, next) => {
  const cookie = req.cookies["token"];

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.username = decoded.username;
    next();
  });
};
