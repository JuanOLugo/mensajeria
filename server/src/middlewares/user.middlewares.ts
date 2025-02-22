import { Request, Response } from "express";
import userModel from "../DB/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface DataToSend {
  data?: object;
  message: string;
  type: "error" | "data" | "message";
}

const SECRET_KEY = "21950524";

export const RegisterUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username, userpassword } = req.body;
  if (!username || !userpassword)
    return res.status(400).send("Faltan credenciales");

  const hashedPassword = await bcrypt.hash(userpassword, 15);

  const NewUser = new userModel({
    username,
    password: hashedPassword,
    IsOnline: false,
  });

  try {
    const data = await NewUser.save();
    const userToken = jwt.sign(data.toObject(), SECRET_KEY);
    const InfoResponse: DataToSend = {
      message: "Usuario creado correctamente",
      type: "message",
    };
    return res
      .status(201)
      .cookie("user", userToken)
      .send(InfoResponse);
  } catch (error) {
    const ErrorResponse: DataToSend = {
      message: "Usuario ya existe",
      type: "error",
    };
    return res.status(500).send(ErrorResponse);
  }
};

export const LoginUser = async (req: Request, res: Response): Promise<any> => {
  const { username, userpassword } = req.body;

  if (!username || !userpassword) {
    const NoBodyResponse: DataToSend = {
      message: "Faltan credenciales",
      type: "error",
    };
    return res.status(400).send(NoBodyResponse);
  }

  const VerifyUserName = await userModel
    .findOne({ username })
    .select("+password");

  if (VerifyUserName) {
    const hashedPassword = await bcrypt
      .compare(userpassword, VerifyUserName?.password)
      .catch((err) => console.log(err, VerifyUserName));

    const UserWithoutPassword = VerifyUserName.toObject();
    const { password, ...userData } = UserWithoutPassword;

    if (!hashedPassword) {
      const IncorrectPasswordResponse: DataToSend = {
        message: "Credenciales incorrectas",
        type: "error",
      };
      return res.status(400).send(IncorrectPasswordResponse);
    }

    const UserToken = jwt.sign(userData, SECRET_KEY);
    const UserResponse: DataToSend = {
      message: "Sesion iniciada correctamente",
      data: userData,
      type: "data",
    };
    res
      .status(200)
      .cookie("user", UserToken, { httpOnly: false })
      .send(UserResponse);
  } else {
    const UserNoExistResponse: DataToSend = {
      message: "Credenciales incorrectas",
      type: "error",
    };
    return res.status(400).send(UserNoExistResponse);
  }
};


export const GetUserBasicInfo = async (req: Request, res: Response): Promise<any> => {
    const UserBasicPromise: DataToSend = {
      message: "Basic information get",
      data: req.user,
      type: "data"
    }
    const UserBasicErrorPromise: DataToSend = {
      message: "Basic information cannot get because token is invalid or not exist",
      type: "error"
    }
    if(req.user) res.status(200).send(UserBasicPromise)
    else res.status(404).send(UserBasicErrorPromise)
};
