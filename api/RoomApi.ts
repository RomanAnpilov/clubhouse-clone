import { AxiosInstance } from "axios";
import { GetServerSidePropsContext } from "next";
import Cookies from "nookies";

export interface Room {
  id: number;
  title: string;
  speakers: any[];
  listenersCount: number;
}

export type RoomType = "open" | "social" | "closed";

export const RoomApi = (instance: AxiosInstance) => {
  return {
    getAll: async (): Promise<Room[]> => {
      const { data } = await instance.get("/rooms");
      return data;
    },
    get: async (id: number): Promise<Room> => {
      const { data } = await instance.get(`/rooms/${id}`);
      return data;
    },
    create: async (form : {title: string, type: RoomType}): Promise<Room> => {
      const { data } = await instance.post("/rooms", form);
      return data;
    },
    delete: async (id: number): Promise<void> => instance.delete(`/rooms/${id}`),
  };
};
