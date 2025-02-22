import mongoose, { Schema, model, Document } from "mongoose";

type TypeChat = "Group" | "Conversation";

export interface IMessage extends Document {
  typeChat: TypeChat;
  users: Array<mongoose.Types.ObjectId>;
  messages: Array<mongoose.Types.ObjectId>;
}

const MessageSchema: Schema = new Schema<IMessage>({
  typeChat: { type: String, required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  messages: [{type: mongoose.Types.ObjectId, ref: "IndividualMessage"}],
});

export default model<IMessage>("Message", MessageSchema);
