import { Router, Request, Response } from "express";
import passport from "../Auth/Passport.cfg";
import { registerUser } from "../middlewares/user.middlewares";
export const UserRouter = Router()

UserRouter.post("/register", registerUser)