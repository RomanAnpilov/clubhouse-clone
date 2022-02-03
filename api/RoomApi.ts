import { Axios } from "../core/axios";
import { GetServerSidePropsContext } from "next";
import Cookies from "nookies";

export interface Room {
  id: number;
  title: string;
  speakers: any[];
  listenersCount: number;
}

type RoomType = "open" | "social" | "closed";

export const RoomApi = (ctx: GetServerSidePropsContext) => {
  const token = Cookies.get(ctx).token;
  Axios.defaults.headers["Authorization"] = "Bearer " + token;

  return {
    getAll: async (): Promise<Room[]> => {
      const { data } = await Axios.get("/rooms");
      return data;
    },
    get: async (id: number): Promise<Room> => {
      const { data } = await Axios.get(`/rooms/${id}`);
      return data;
    },
    create: async (form : {title: string, type: RoomType}): Promise<Room> => {
      const { data } = await Axios.post("/rooms", form);
      return data;
    },
    delete: async (id: number): Promise<void> => Axios.delete(`/rooms/${id}`),
  };
};
