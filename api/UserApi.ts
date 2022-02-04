import { GetServerSidePropsContext } from "next";
import { AxiosInstance } from "axios";
import { UserData } from "../pages";
import Cookies from "nookies";

export const UserApi = (instance: AxiosInstance) => {
  return {
    getMe: async (): Promise<UserData> => {
      const { data } = await instance.get("/auth/me");
      return data;
    },
  };
};
