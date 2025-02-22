import React from "react";

function Notification({ message, user }: { message: string; user: string }) {
  return (
    <div className="absolute right-7 w-72 text-center top-8 bg-gray-300 text-gray-800 p-2 rounded-2xl ">
      <h1 className="text-2xl ">
        {message}: {user}
      </h1>
    </div>
  );
}

export default Notification;
