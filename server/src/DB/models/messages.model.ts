import mongoose, { Schema, model, Document } from "mongoose";


interface IMessage extends Document{
    author: mongoose.Types.ObjectId,
    userRecipient: mongoose.Types.ObjectId,
    Read: boolean,
}


const MessageSchema: Schema = new Schema<IMessage>({
    author: mongoose.Types.ObjectId ,
    userRecipient: mongoose.Types.ObjectId ,
    Read: {type: Boolean, required: true}
})


export default model<IMessage>("Message", MessageSchema)