import { Request, Response } from "express";
import userModel from "../DB/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

interface UserToSend {
    username: String,
    _id: mongoose.Types.ObjectId
}

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) res.status(400).send("Faltan credenciales");

  const hashedPassword = await bcrypt.hash(password, 15);

  const NewUser = new userModel({
    username,
    password: hashedPassword,
    IsOnline: false
  });

  try {
    const data = await NewUser.save()
    const userToken = jwt.sign(data.toObject(), "21950524")
    res.cookie("message", userToken, {httpOnly: true, secure: true})
    res.status(201).send({message: "Usuario creado correctamente"})
  } catch (error) {
    res.status(500).send({message: "Usuario existente", error})
  }

};
