import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbconnect } from "./DB/index.connection";
import passport from "./Auth/Passport.cfg";
import { UserRouter } from "./Routes/user.router";
import { Server } from "socket.io";
import http from "http";
import userModel from "./DB/models/user.model";
import mongoose from "mongoose";
import { IUserSingleInfo } from "./Interfaces/UserSingleInfo";
import { ChatRouter } from "./Routes/chats.router";
import { DataToSend } from "./middlewares/user.middlewares";
import MessageModel from "./DB/models/Message.model";
import IndividualMessagesModel from "./DB/models/IndividualMessages.model";
import { emit } from "process";

config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(passport.initialize());
app.use("/api/auth", UserRouter);
app.use("/api/chats", ChatRouter);

io.on("connection", (socket) => {
  //console.log(`🔌 Usuario conectado: ${socket.id}`);

  socket.on(
    "IsOnline",
    async ({ userid, chatsid }: { userid: string; chatsid: Array<string> }) => {
      if (userid) {
        await userModel.findByIdAndUpdate(userid, { IsOnline: true });

        const UsersConnects = await userModel.find({ IsOnline: true });
        let UsersConnectSingleInfo = UsersConnects.map((user) => ({
          username: user.username,
          _id: user._id,
        }));

        chatsid?.map((chat) => {
          socket.join(chat);
        });
        socket.join("usersconnect");
        socket.join(userid);

        io.to("usersconnect").emit("usersconnectarray", {
          message: `✅ ${userid} se conectó`,
          users: UsersConnectSingleInfo,
        });
      }
    }
  );

  socket.on("IsOffline", async ({ userid }) => {
    if (userid) {
      await userModel.findByIdAndUpdate(userid, { IsOnline: false });

      const UsersConnects = await userModel.find({ IsOnline: true });
      let UsersConnectSingleInfo = UsersConnects.map((user) => ({
        username: user.username,
        _id: user._id,
      }));

      socket.leave("usersconnect");

      io.to("usersconnect").emit("usersconnectarray", {
        message: `User se desconectó: ${userid}`,
        users: UsersConnectSingleInfo,
      });
    }
  });

 

  socket.on("requesttojoin", async ({ user_id, user_r_id }) => {
    const userwant = await userModel.findById(user_id);

    io.to(user_r_id).emit("requestmessage", {
      message: "Un usuario quiere hablarte",
      userwant: userwant?.username,
      userwantid: user_id,
    });
  });

  socket.on("acceptrequest", async ({ user_id, user_r_id }) => {
    const newmessage = new IndividualMessagesModel({
      author: user_id,
      userRecipient: user_r_id,
      message: "He aceptado tu solicitud de chat",
      Read: false,
    });

    const savedbmessage = await newmessage.save();

    const newchat = new MessageModel({
      messages: [savedbmessage._id],
      users: [user_id, user_r_id],
      typeChat: "Conversation",
    });

    const savedbchat = await newchat
      .save()
      .then(
        async (data) =>
          await MessageModel.findById(data._id)
            .populate("users")
            .populate("messages")
      )
      .then((data) => data)
      .catch((err) => console.log(err));

    io.to(user_id).emit("new_chat_from_request", savedbchat);
    io.to(user_r_id).emit("new_chat_from_request", savedbchat);
  });

  socket.on("jointochatroom", ({ chatid }) => {
    socket.join(chatid);
  });

  socket.on(
    "personalchat",
    async ({ chatid, author, userRecipient, message }) => {
      const newMessage = new IndividualMessagesModel({
        message: message,
        author: author,
        userRecipient: userRecipient,
        Read: false,
        chatowner: chatid,
      });

      let ChatToSend;

      let messagesave;
      try {
        messagesave = await newMessage
          .save()
          .then(async (savemessage) => {
            return await IndividualMessagesModel.findById(savemessage._id)
              .populate("author")
              .populate("userRecipient")
              .exec();
          })
          .then((PopulateMessage) => PopulateMessage)
          .catch((err) => console.log(err));

        ChatToSend = await MessageModel.findByIdAndUpdate(
          chatid,
          {
            $push: { messages: messagesave?._id },
          },
          { new: true }
        )
          .populate("users")
          .populate({
            path: "messages",
            populate: { path: "author userRecipient" },
          });
      } catch (error) {
        console.log(error);
      }
      const ChatsResponse: DataToSend = {
        message: "User chat recolectado y actualizado",
        data: {
          message: messagesave,
        },
        type: "data",
      };

      io.to(chatid).emit("newmessagechat", ChatsResponse);
    }
  );
});

const PORT: number = 3000;
server.listen(PORT, () => {
  dbconnect();
  console.log("RUN ON PORT", PORT);
});
