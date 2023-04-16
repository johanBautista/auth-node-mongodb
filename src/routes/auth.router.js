import { Router } from "express";
import { allUser, infoUser, login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultRequest } from "../middlewares/validationResult.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/", allUser);
// ejemplo de ruta protegida por token
router.get("/protected", requireToken, infoUser);

router.post(
  "/register",
  [
    body("email", "Ingrese un email válido").trim().isEmail().normalizeEmail(),
    body("password", "Contraseña mínimo 6 carácteres")
      .trim()
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("No coinciden las contraseñas");
        }
        return value;
      }),
  ],
  validationResultRequest,
  register
);

router.post(
  "/login",
  [
    body("email", "Ingrese un email válido").trim().isEmail().normalizeEmail(),
    body("password", "Contraseña mínimo 6 carácteres").trim().isLength({ min: 6 }),
  ],
  validationResultRequest,
  login
);

export default router;
