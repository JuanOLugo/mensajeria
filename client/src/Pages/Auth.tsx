import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import Cookies from "js-cookie";
import { LoginUser, SingUpUser } from "../Controllers/User.C";
import ErrorMessage from "../Components/ErrorMessage";

type AuthType = "login" | "register";

interface User {
  username: string;
  userpassword: string;
}

export default function Auth() {
  const [authType, setAuthType] = useState<AuthType>("login");
  const [user, setUser] = useState<User>({ username: "", userpassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const userFromContext = useContext(UserContext);

  const UserToLogin = async () => {
    setIsLoading(true);
    try {
      const data = await LoginUser(user);
      const userCookie = Cookies.get("user");
      if (userCookie) {
        localStorage.setItem("user", userCookie);
        userFromContext?.setUser(data.data.data);
      }
    } catch (err: any) {
      console.error(err);
      if (err)
        setErrorMessage(err.data?.message ?? err.response?.data?.message);
      else setErrorMessage("Error to try login");
      setTimeout(() => setErrorMessage(null), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const UserToSingUp = async () => {
    setIsLoading(true);
    try {
      const data = await SingUpUser(user);
      const userCookie = Cookies.get("user");
      if (userCookie) {
        localStorage.setItem("user", userCookie);
        userFromContext?.setUser(data.data.data);
      }
    } catch (err: any) {
      console.error(err);
      if (err)
        setErrorMessage(err.data?.message ?? err.response?.data?.message);
      else setErrorMessage("Error to try login");
      setTimeout(() => setErrorMessage(null), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user.username && user.userpassword) {
      if(authType == "login") UserToLogin()
      else UserToSingUp()
    } else {
      setErrorMessage("Please fill in all credentials");
      setTimeout(() => setErrorMessage(null), 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          {authType === "login" ? "Iniciar sesión" : "Registrate"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu nombre de usuario"
              maxLength={18}
              minLength={4}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="userpassword"
              value={user.userpassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
              minLength={4}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            {isLoading
              ? "Cargando..."
              : authType === "login"
              ? "Inicia sesión"
              : "Registrate"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() =>
              setAuthType(authType === "login" ? "register" : "login")
            }
            className="text-sm text-blue-600 hover:underline focus:outline-none"
          >
            {authType === "login"
              ? "Necesitas una cuenta? Registrate"
              : "Tienes una cuenta? Inicia sesión"}
          </button>
        </div>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    </div>
  );
}
