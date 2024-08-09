import jwt from "jsonwebtoken";

export const Authenticate = (req, res, next) => {
  const token = req.cookies.authToken; // Retrieve the token from the cookie

  if (!token) return res.status(401).json({ msg: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }
    req.userId = decoded.userId; // Save the userId in the request
    next();
  });
};
