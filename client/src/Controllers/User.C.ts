import axios from "axios";
axios.defaults.withCredentials = true;
export const port: string = "3000"

export const ProxyHandler = (port: string, api: string) =>
  "http://localhost:" + port + "/" + api;

export const GetBasicUserInformation = async (data: object | string) => {
    return await axios.get(ProxyHandler(port, "api/auth/userbasic"), {
        headers: {
            Authorization: "Bearer " + data
        }
    }) 
}

export const LoginUser = async (data: object | string) => {
    return await axios.post(ProxyHandler(port, "api/auth/login"), data, { withCredentials: true }) 
}

export const SingUpUser = async (data: object | string) => {
    return await axios.post(ProxyHandler(port, "api/auth/register"), data, { withCredentials: true }) 
}

