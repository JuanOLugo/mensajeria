import type React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import RecentChats from "../Components/Chat/RecentChats";
import MessageSidebar from "../Components/Chat/MessageSideBar";
import ChatWindow from "../Components/Chat/ChatWindow";
import { io } from "socket.io-client";
import UserContext from "../contexts/UserContext";
import { port } from "../Controllers/User.C";
import { GetUserChats } from "../Controllers/Chat.C";
import { UserContextType } from "../contexts/UserContext";
import WaitSource from "../Components/WaitSource";
import RequestToJoinNotification from "../Components/RequestToJoinNotification";
import Notification from "../Components/Notification";
// Mock data (same as before)

export interface IOnlineUsers {
  _id: string | undefined;
  username: string | undefined;
}

export interface IActiveChat {
  chatId: number | string | undefined | null;
  user: IOnlineUsers;
}

export interface ISingleMessage {
  _id: string;
  author: { username: string; _id: string };
  userRecipient: { username: string };
  Read: boolean;
  message: string;
}

export interface IUserChat {
  _id: string;
  typeChat: string;
  users: Array<IOnlineUsers>;
  messages: Array<ISingleMessage>;
}

export interface RequestNotification {
  message: string;
  userwant: string;
  userwantid: string;
}

interface Inotification {
  message: string;
  userrejecter: string;
}

export const socket = io("http://localhost:" + port, {
  autoConnect: false,
});
const Chat = () => {
  const [UserNotification, setUserNotification] = useState<Inotification>();
  const [messageOfChat, setmessageOfChat] = useState<Array<ISingleMessage>>([]);
  const [ActiveChat, setActiveChat] = useState<IActiveChat>();
  const [Requests, setRequests] = useState<Array<RequestNotification>>([]);
  const [onlineUsers, setonlineUsers] = useState<Array<IOnlineUsers>>([]);
  const [UserChats, setUserChats] = useState<Array<IUserChat> | null>(null);
  const [Wait, setWait] = useState({
    usersC: true,
    chatwindow: true,
    recentChats: true,
  });

  const { recentChats } = Wait;

  const User = useContext(UserContext);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    function SetUsersConnectAndDisconnect(
      { users }: { users: Array<IOnlineUsers> },
      User: UserContextType
    ) {
      const OnlineUsers = users.filter(
        (user: IOnlineUsers) => user._id !== User.User?._id
      );
      setonlineUsers(OnlineUsers);
    }

    if (User?.User?._id) {
      if (!socket.connected) {
        socket.connect();
      }

      if (UserChats) {
        const chatsid = UserChats.map((chat) => chat._id);

        socket.emit("IsOnline", {
          userid: User?.User?._id,
          username: User?.User?.username,
          chatsid,
        });

        socket.on("usersconnectarray", (e) => {
          SetUsersConnectAndDisconnect(e, User);
          console.log(e);
        });
        socket.on("usersdiscoarray", (e) => {
          SetUsersConnectAndDisconnect(e, User);
        });
      }

      const usertoken = localStorage.getItem("user");
      if (usertoken) {
        if (!UserChats) {
          GetUserChats(usertoken).then((data) => {
            setUserChats(data.data.data);
            setWait({ ...Wait, recentChats: false });
          });
        }
      }

      window.addEventListener("beforeunload", () =>
        socket.emit("IsOffline", { userid: User?.User?._id })
      );
    }
  }, [User, UserChats]);

  useEffect(() => {
    if (!User?.User?.username) return;

    const handleMessageNew = (data: any): any => {
      const fil = UserChats?.filter((chat) => {
        if (data.data.message.chatowner == chat._id) {
          chat.messages.push(data.data.message);
          if (chat.messages.length > 100) {
            chat.messages.shift();
          }
          setmessageOfChat(chat.messages);
        }
        return chat;
      });

      setUserChats(fil ?? null);
    };
    const handleMessageOld = (data: any) => {
      if (!UserChats) {
        setUserChats([data]);
      } else {
        if (UserChats) {
          setUserChats([...UserChats, data]);
        }
      }

      socket.emit("jointochatroom", { chatid: data._id });
    };

    socket.on("new_chat_from_request", handleMessageOld);

    socket.on("new_reject", (data) => {
      setUserNotification(data);
      setTimeout(() => {
        setUserNotification(undefined);
      }, 5000);
    });

    socket.on("requestmessage", (data) => {
      setRequests([...Requests, data]);
    });

    socket.on("newmessagechat", handleMessageNew);

    socket.on(User.User._id, (data) => {
      setActiveChat({
        chatId: data._id,
        user: {
          username: data.users[1].username,
          _id: data.users[1]._id,
        },
      });
    });

    return () => {
      socket.off("new_message", handleMessageOld);
      socket.off("newmessagechat", handleMessageNew);
    };
  }, [!User?.User?.username, UserChats]);

  const handleUserClick = (userId: string) => {
    const user = onlineUsers.find((u) => u?._id === userId);
    const userRecent = UserChats?.find((e) => {
      return e.users.find((u) => u._id === userId);
    });
    console.log(userRecent)
    if (userRecent) {
      handleChatClick(userRecent._id);
    } else {
      if (user) {
        socket.emit("requesttojoin", {
          user_id: User?.User?._id,
          user_r_id: userId,
        });
      }
    }
  };

  const handleChatClick = (chatId: string) => {
    const chatF = UserChats?.find((c) => c._id === chatId);
    if (chatF) {
      const userChat = chatF.users.find(
        (user) => user?._id !== User?.User?._id
      );
      setActiveChat({
        chatId: chatF._id,
        user: { username: userChat?.username, _id: userChat?._id },
      });
      UserChats?.filter((chat) => {
        if (chat._id == chatF._id) {
          setmessageOfChat(chat.messages);
        }
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex h-screen">
      
    {
      UserNotification ?
      <Notification
        message={UserNotification?.message as ""}
        user={UserNotification?.userrejecter as ""}
      /> : null
    }

      {Requests.length < 1
        ? null
        : Requests.map((r, i) => {
            return (
              <RequestToJoinNotification
                setRequests={setRequests}
                Requests={Requests}
                key={i}
                message={r.message}
                userwant={r.userwant}
                userwantid={r.userwantid}
              />
            );
          })}

      <MessageSidebar
        onlineUsers={onlineUsers}
        onUserClick={handleUserClick}
        isExpanded={isSidebarExpanded}
        onToggle={toggleSidebar}
      />

      {recentChats ? (
        <WaitSource />
      ) : (
        <RecentChats chats={UserChats} onChatClick={handleChatClick} />
      )}

      <ChatWindow activeChat={ActiveChat} messages={[...messageOfChat]} />
    </div>
  );
};

export default Chat;
