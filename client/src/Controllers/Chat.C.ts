import axios from "axios";
import { port } from "./User.C";
axios.defaults.withCredentials = true;

export const ProxyHandler = (port: string, api: string) =>
  "http://localhost:" + port + "/" + api;

export const GetUserChats = async (data: object | string) => {
  return await axios.get(ProxyHandler(port, "api/chats/getmychat"), {
    headers: {
      Authorization: "Bearer " + data,
    },
  });
};
