import express from "express";
import { register, login } from "../controller/auth.controller";
import { validateRegister, validateLogin } from "../middlewares/auth.validate";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

export default router;