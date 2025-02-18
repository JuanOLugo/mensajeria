import axios from "axios";
axios.defaults.withCredentials = true;
export const ProxyHandler = (port: string, api: string) =>
  "http://localhost:" + port + "/" + api;

export const GetBasicUserInformation = async (data: object | string) => {
    return await axios.get(ProxyHandler("3000", "api/auth/userbasic"), {
        headers: {
            Authorization: "Bearer " + data
        }
    }) 
}

export const LoginUser = async (data: object | string) => {
    return await axios.post(ProxyHandler("3000", "api/auth/login"), data, { withCredentials: true }) 
}
