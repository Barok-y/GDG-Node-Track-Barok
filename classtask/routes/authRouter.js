import express from "express";
import { signUp,signIN,refreshToken } from "../controller/authcontroller.js";

const authRouter = express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/signin",signIN);
authRouter.post("/refresh-token",refreshToken);

export default authRouter;