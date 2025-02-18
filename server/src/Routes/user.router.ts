import { Router, Request, Response } from "express";
import passport from "../Auth/Passport.cfg";
import {
  RegisterUser,
  LoginUser,
  GetUserBasicInfo,
} from "../middlewares/user.middlewares";
export const UserRouter = Router();

UserRouter.post("/register", RegisterUser);
UserRouter.post("/login", LoginUser);
UserRouter.get(
  "/userbasic",
  passport.authenticate("jwt", { session: false }),
  GetUserBasicInfo
);
