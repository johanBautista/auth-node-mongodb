import { tokenVerificationErrors } from "../utils/tokenManager.js";
import Jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("No existe el token");

    const { uid } = Jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    req.uid = uid;
    console.log("🍟 ---> refresh tk");
    next();
  } catch (error) {
    res.status(401).json({ error: tokenVerificationErrors[error.message] });
  }
};
