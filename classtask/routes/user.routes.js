import {Router} from "express"
import { getUser } from "../controllers/user.controller.js";
import { authenticateAccessToken } from "../middlewares/authenticate.middleware.js";
const userRouter = Router();

userRouter.get("/profile",authenticateAccessToken,getUser)

export default userRouter;