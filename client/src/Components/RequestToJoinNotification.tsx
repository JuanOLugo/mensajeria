import React, { useContext } from "react";
import { RequestNotification, socket } from "../Pages/Chat";
import UserContext from "../contexts/UserContext";

interface IRequestMessages {
  message: string;
  userwant: string;
  userwantid: string;
  setRequests: any;
  Requests: Array<RequestNotification>;
}

function RequestToJoinNotification({
  message,
  userwant,
  userwantid,
  setRequests,
  Requests,
}: IRequestMessages) {
  const User = useContext(UserContext);

  const handleOnCLick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target.name === "aceptar") {
      if (User?.User) {
        socket.emit("acceptrequest", {
          user_id: User?.User._id,
          user_r_id: userwantid,
        });

        const newrequets = Requests.filter(r => r.userwantid !== userwantid)

        setRequests(newrequets)
      }
    }


    if (e.target.name === "rechazar") {
        if (User?.User) {
          socket.emit("rejectrequest", {
            user_id: User?.User._id,
            user_r_id: userwantid,
          });
  
          const newrequets = Requests.filter(r => r.userwantid !== userwantid)
  
          setRequests(newrequets)
        }
      }
  };

  return (
    <div className="absolute right-7 w-72 text-center top-8 bg-gray-300 text-gray-800 p-2 rounded-2xl ">
      <h1 className="text-2xl ">
        {message}: <label className="font-bold">{userwant}</label>
      </h1>
      <div className=" mt-2 flex w-full justify-evenly">
        <button
          className="bg-emerald-500 cursor-pointer p-2 rounded-2xl"
          name="aceptar"
          onClick={handleOnCLick}
        >
          Aceptar
        </button>
        <button
          className="bg-red-500 cursor-pointer p-2 rounded-2xl"
          name="rechazar"
          onClick={handleOnCLick}
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}

export default RequestToJoinNotification;
