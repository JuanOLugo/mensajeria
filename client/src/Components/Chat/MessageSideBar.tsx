import type React from "react"
import { Users, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { IOnlineUsers } from "../../Pages/Chat"



interface MessageSidebarProps {
  onlineUsers: IOnlineUsers[]
  onUserClick: (userId: string) => void
  isExpanded: boolean
  onToggle: () => void
}

const MessageSidebar: React.FC<MessageSidebarProps> = ({ onlineUsers, onUserClick, isExpanded, onToggle }) => {
  return (
    <div
      className={`bg-gray-100 h-screen flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? "w-52" : "w-16"}`}
    >
      <div className="p-4 flex items-center justify-between">
        {isExpanded && <h2 className="text-xl font-semibold">Messages</h2>}
        <button className="text-blue-500 hover:text-blue-600" onClick={onToggle}>
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      {isExpanded && (
        <>
          <button className="flex items-center space-x-2 mb-4 mx-4 text-gray-600 hover:text-gray-800">
            <Users size={20} />
            <span>Online Users</span>
          </button>
          <div className="flex-grow overflow-y-auto px-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Online - {onlineUsers.length}</h3>
            {onlineUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center space-x-3 mb-2 cursor-pointer hover:bg-gray-200  p-2 rounded"
                onClick={() => onUserClick(user._id ?? "")}
              >
                <div className="relative">
                  <div className=" right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm">{user.username}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {!isExpanded && (
        <div className="flex flex-col items-center mt-4">
          <button className="text-gray-600 hover:text-gray-800 mb-4">
            <MessageSquare size={24} />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <Users size={24} />
          </button>
          <button onClick={() => {
            window.localStorage.removeItem("user")
            window.location.reload()
          }}>
            close
          </button>
        </div>
      )}
    </div>
  )
}

export default MessageSidebar

