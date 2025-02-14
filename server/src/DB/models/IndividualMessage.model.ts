import mongoose, { Schema, model, Document } from "mongoose";

type TypeChat = "Group" | "Conversation"

interface IIndividualMessage extends Document{
    typeChat: TypeChat,
    users: Array<mongoose.Types.ObjectId>
    messages: Array<mongoose.Types.ObjectId>,
    Read: boolean,
}


const IndividualMessageSchema: Schema = new Schema<IIndividualMessage>({
    typeChat: {type: String, required: true} ,
    users: Array<mongoose.Types.ObjectId> ,
    messages: Array<mongoose.Types.ObjectId>,
    Read: {type: Boolean, required: true}
})


export default model<IIndividualMessage>("IndividualMessage", IndividualMessageSchema)