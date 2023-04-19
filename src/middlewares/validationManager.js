import { body, param, validationResult } from "express-validator";

export const validationResultRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

export const bodyRegisterValidator = [
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
  validationResultRequest,
];

export const bodyLoginValidator = [
  body("email", "Ingrese un email válido").trim().isEmail().normalizeEmail(),
  body("password", "Contraseña mínimo 6 carácteres").trim().isLength({ min: 6 }),
  validationResultRequest,
];

export const bodyTaskValidator = [
  body("title", "Ingrese un title válido").trim().notEmpty(),
  body("description", "Ingrese una descripcion").trim().notEmpty(),
  validationResultRequest,
];

export const paramsTaskValidator = [
  param("id", "Formato de Id no valido").trim().notEmpty().escape(),
  validationResultRequest,
];
