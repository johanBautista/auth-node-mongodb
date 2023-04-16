import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) throw new Error("No Bearer");

    token = token.split(" ")[1];
    // get payload
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    console.log("payload", uid);

    next();
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
