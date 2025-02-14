import { Schema, model, Document } from "mongoose";

interface IUser extends Document{
    username: string,
    password: string,
    IsOnline: boolean
}


const UserSchema: Schema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    IsOnline: {type: Boolean, required: true}
})


export default model<IUser>("User", UserSchema)