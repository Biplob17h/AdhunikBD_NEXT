import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const payload = { userId };

  // Generate JWT token
  const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return token;
};


