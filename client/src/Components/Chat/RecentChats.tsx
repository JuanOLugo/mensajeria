import type React from "react"
import { IUserChat } from "../../Pages/Chat"
import WaitSource from "../WaitSource"
import UserContext from "../../contexts/UserContext"
import { useContext } from "react"
interface Chat {
  id: string
  user: {
    name: string
    avatar: string
  }
  lastMessage: string
  timestamp: string
}

interface RecentChatsProps {
  chats: Array<IUserChat> | [] | null
  onChatClick: (chatId: string) => void
}

const RecentChats: React.FC<RecentChatsProps> = ({ chats, onChatClick }) => {

  console.log(chats)

  const User = useContext(UserContext)


  return (
    <div className="flex-grow w-96 border-l bg-white p-4 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">Recent Chats</h2>
      {chats? chats.map((chat) => (
        <div
          key={chat._id}
          className="flex items-center space-x-4 mb-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
          onClick={() => onChatClick(chat._id)}
        >
        
          <div className="flex-grow">
            <h3 className="font-semibold">{chat.users.find(user => user._id !== User?.User?._id)?.username ?? "No existe"}</h3>
            <p className="text-sm text-gray-600 truncate">{chat.messages[chat.messages.length - 1].author?._id == User?.User?._id ? "Tu" : chat.messages[chat.messages.length - 1].author?.username}: {chat.messages[chat.messages.length - 1].message.length > 10 ?chat.messages[chat.messages.length - 1].message.split(" ")[0] + " ..." : chat.messages[chat.messages.length - 1].message }</p>
          </div>
        </div>
      )): <WaitSource/>}
    </div>
  )
}

export default RecentChats