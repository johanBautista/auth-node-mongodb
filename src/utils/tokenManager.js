import Jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  try {
    const expiresIn = 1000 * 60 * 15;
    const token = Jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
    const TokenVerificationErrors = {
      "invalid signature": "La firma del JWT no es válida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token no válido",
      "No Bearer": "Utiliza formato Bearer",
      "jwt malformed": "JWT formato no válido",
    };
    return res.status(401).send({ error: TokenVerificationErrors[error.message] });
  }
};
