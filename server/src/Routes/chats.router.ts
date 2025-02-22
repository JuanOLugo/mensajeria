import { Router, Request, Response } from "express";
import passport from "../Auth/Passport.cfg";
import { GetMyChats } from "../middlewares/chats.middleware";
export const ChatRouter = Router();

ChatRouter.get("/getmychat",passport.authenticate("jwt", {session: false}) , GetMyChats);
