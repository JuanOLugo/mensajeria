import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
function PublicRoute() {
  const User = useContext(UserContext);
  const userLocal = localStorage.getItem("user");

  return userLocal  ? (
    <>
      <Navigate to={"/"} />
    </>
  ) : (
    <>
      <Outlet />
    </>
  );
}

export default PublicRoute;
