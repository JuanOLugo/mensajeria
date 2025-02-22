import { SendHorizontal } from "lucide-react";
import type React from "react";
import { IActiveChat, ISingleMessage, socket } from "../../Pages/Chat";
import { act, useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../contexts/UserContext";
import WaitSource from "../WaitSource";

interface ChatWindowProps {
  activeChat: IActiveChat | undefined;
  messages: Array<ISingleMessage>;

}

const ChatWindow: React.FC<ChatWindowProps> = ({ activeChat, messages}) => {
  const chatContainerRef: React.RefObject<HTMLDivElement> = useRef(null);
  const [Message, setMessage] = useState("");
  const User = useContext(UserContext);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!User?.User?._id || !activeChat?.user?._id) return;

    
      setMessage("");
    
      socket.emit("personalchat", {
        chatid: activeChat.chatId,
        author: User.User._id,
        userRecipient: activeChat.user._id,
        message: Message,
      });
      setMessage("");
    
  };


  
  useEffect(() => {
    if (chatContainerRef?.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages])
  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  if (!activeChat) {
    return (
      <div className="w-1/3 border-l h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Welcome {User?.User?.username ?? "to chat"}
          </h2>
          <p className="text-gray-600">
            Selecciona un chat o un usuario para empezar a mensajear
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" border-l   w-full h-screen flex flex-col">
      <div className="bg-gray-100 p-4 flex items-center space-x-4">
        <h2 className="font-semibold">{activeChat.user.username}</h2>
      </div>
      <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
        {!messages ? (
          <WaitSource />
        ) : (
          <div className="space-y-4 ">
            {messages.map((m) => (
              <div
                key={m._id}
                className={`flex flex-col  ${
                  m.author._id === activeChat.user._id
                    ? "items-start"
                    : "items-end"
                }`}
              >
                <p className="font-semibold">
                  {m.author.username === activeChat.user.username
                    ? activeChat.user.username
                    : "Yo:"}
                </p>
                <div
                  className={`max-w-[70%] p-3  rounded-lg ${
                    m.author._id === activeChat.user._id
                      ? "bg-blue-500 text-white"
                      : "bg-emerald-500 text-white"
                  }`}
                >
                  <p>{m.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <form
        className="p-4  border-t flex items-center justify-between"
        onSubmit={handleSubmit}
      >
        <input
          value={Message}
          type="text"
          placeholder="Type a message..."
          className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <label>
          <button className="bg-emerald-500 text-white p-2 rounded-4xl ml-2">
            <SendHorizontal />
          </button>
        </label>
      </form>
    </div>
  );
};

export default ChatWindow;
