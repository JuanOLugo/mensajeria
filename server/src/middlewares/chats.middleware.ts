import mongoose from "mongoose";
import MessageModel from "../DB/models/Message.model";
import { Request, Response } from "express";
import { DataToSend } from "./user.middlewares";
import IndividualMessagesModel from "../DB/models/IndividualMessages.model";
export const GetMyChats = async (req: Request, res: Response): Promise<any> => {
  if (req.user) {
    let chats;
    const { _id } = req.user;
    const new_id = new mongoose.Types.ObjectId(_id as "");
    try {
      chats = await MessageModel.find({"users": _id }).populate("users").populate({
        path: "messages",
        populate: { path: "author userRecipient" }
      });
    } catch (error) {

      const ErrorResponse: DataToSend = {
        message: "Error al encontrar el chat o crear el id",
        type: "data",
      };
      console.log(error)
      return res.status(400).send(ErrorResponse);
    }



    const ChatsResponse: DataToSend = {
      message: "Lista de chats",
      data: chats,
      type: "data",
    };

    res.status(200).send(ChatsResponse);
    
  }
};

export const MessageController = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (req.user) {
    const { _id } = req.user;
    const { userid, message } = req.body;

    const UserChats = await MessageModel.findById(_id);
    
    if (UserChats) {
      const newMessage = new IndividualMessagesModel({
        message,
        author: _id,
        userRecipient: userid,
        Read: false,
      });

      const messagesave = await newMessage.save();

      const ChatToSend = await MessageModel.findByIdAndUpdate(
        UserChats._id,
        {
          $push: { messages: messagesave._id},
        },
        { new: true }
      )
        .populate("users")
        .populate("messages");

      const ChatsResponse: DataToSend = {
        message: "User chat recolectado y actualizado",
        data: ChatToSend?.toObject(),
        type: "data"
      } 

      return res.status(200).send(ChatsResponse)
    }else{

      const newMessage = new IndividualMessagesModel({
        message,
        author: _id,
        userRecipient: userid,
        Read: false,
      });

      const messagesave = await newMessage.save();

      const newChat = new MessageModel({
        users: [_id, userid],
        typeChat: "Conversation",
        messages: [messagesave._id]
      })

      const chatsave = newChat.save()

    }
  }
};
