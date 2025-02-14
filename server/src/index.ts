import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbconnect } from "./DB/index.connection";
import passport from "./Auth/Passport.cfg"
import { UserRouter } from "./Routes/user.router";
config();

const app = express();

app.use(cors());
app.use(express.json())
app.use(passport.initialize())
app.use("/api/auth", UserRouter)
const PORT: number = 3000;

app.listen(PORT, () => {
    dbconnect()
    console.log("RUN ON PORT", PORT)
})
