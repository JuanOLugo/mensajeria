import React, { ChangeEventHandler, useContext, useState } from "react";
import { AuthThings } from "../Auth";
import { LoginUser } from "../../Controllers/User.C";
import ErrorMessage from "../ErrorMessage";
import Cookies from "js-cookie"
import UserContext from "../../contexts/UserContext";
interface User {
  username: string;
  userpassword: string;
}

function FormAuth({ AuthThings }: { AuthThings: AuthThings }) {
  const [User, setUser] = useState<User>({
    username: "",
    userpassword: "",
  });

  const UserFromContext = useContext(UserContext)

  const [ErrorMessages, setErrorMessages] = useState<string | null>(null);
  const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ((AuthThings == "login" && User?.username) || User?.userpassword) {
      LoginUser(User)
        .then((data) => {
          const UserCookie = Cookies.get("user")
          if(UserCookie){
            localStorage.setItem("user", UserCookie)
            UserFromContext?.setUser(data.data.data)
          }
        })
        .catch((err) => {
          console.log(err)
          setErrorMessages(err.message);
          setInterval(() => setErrorMessages(""), 2000);
        });
    } else {
      setErrorMessages("Llene las credenciales");
      setInterval(() => setErrorMessages(""), 2000);
    }

    if ((AuthThings == "register" && User?.username) || User?.userpassword) {
    }
  };

  const HandleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...User, username: e.target.value });

  const HandleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...User, userpassword: e.target.value });
    
  

  return (
    <form onSubmit={HandleSubmit}>
      <h1 className="text-2xl mb-2">Nombre de usuario</h1>
      <input
        type="text"
        maxLength={18}
        minLength={4}
        value={User?.username}
        placeholder="Nombre de usuario"
        className="px-3 py-1 border-2"
        onChange={HandleChangeUsername}
      />
      <h1 className="text-2xl mb-2">Contraseña</h1>
      <input
        type="password"
        className="px-3 py-1 border-2"
        minLength={4}
        placeholder="Contraseña"
        value={User?.userpassword}
        onChange={HandleChangePassword}
      />
      <br />
      <button className="px-3 py-1 border-2 mt-2">
        {AuthThings == "login" ? "Inicia sesión" : "Registrate"}
      </button>
      <ErrorMessage ErrorMessage={ErrorMessages} />
    </form>
  );
}

export default FormAuth;
