import express from "express";
import { allUser, login, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", allUser);

router.post("/register", register);

router.post("/login", login);

export default router;
