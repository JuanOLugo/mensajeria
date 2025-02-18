import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbconnect } from "./DB/index.connection";
import passport from "./Auth/Passport.cfg"
import { UserRouter } from "./Routes/user.router";
import { Server } from "socket.io";
import http from "http"
config();

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(express.json())
app.use(passport.initialize())
app.use("/api/auth", UserRouter)


const PORT: number = 3000;
app.listen(PORT, () => {
    dbconnect()
    console.log("RUN ON PORT", PORT)
})
