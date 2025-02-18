import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { GetBasicUserInformation } from "../Controllers/User.C";
import WaitSource from "./WaitSource";
import { Navigate, Outlet } from "react-router-dom";
function SecurityRoute() {
  const User = useContext(UserContext);

  const userLocal = localStorage.getItem("user");
  const [Wait, setWait] = useState<boolean>(false);

  useEffect(() => {
    const handleStorage = () => {
      if (userLocal) {
        setWait(true);
        GetBasicUserInformation(userLocal)
          .then((data) => {
            User?.setUser(data.data.data);
            setWait(false);
          })
          .catch((err) => {
            localStorage.removeItem("user");
            setWait(false);
          });
      }else localStorage.removeItem("user");
    };

    if (!User?.User) handleStorage();

   

  }, []);


  return !userLocal ? (
    <>
      <Navigate to={"/auth"} />
    </>
  ) : (
    <>
      <Outlet />
    </>
  );
}

export default SecurityRoute;
