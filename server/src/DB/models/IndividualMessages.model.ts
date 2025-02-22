import mongoose, { Schema, model, Document } from "mongoose";


interface IIndividualMessage extends Document{
    author: mongoose.Types.ObjectId,
    userRecipient: mongoose.Types.ObjectId,
    Read: boolean,
    message: string,
    chatowner: mongoose.Types.ObjectId
}


const IndividualMessageSchema: Schema = new Schema<IIndividualMessage>({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"} ,
    userRecipient: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    Read: {type: Boolean, required: true},
    message: {type: String, required: true},
    chatowner: {type: mongoose.Schema.Types.ObjectId, ref: "Message"},
})


export default model<IIndividualMessage>("IndividualMessage", IndividualMessageSchema)