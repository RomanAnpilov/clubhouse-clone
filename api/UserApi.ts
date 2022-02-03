import { GetServerSidePropsContext } from "next";
import { Axios } from "../core/axios";
import { UserData } from "../pages";
import Cookies from "nookies";

export const UserApi = (ctx: GetServerSidePropsContext) => {
  const token = Cookies.get(ctx).token;
  Axios.defaults.headers["Authorization"] = "Bearer " + token;
  return {
    getMe: async (): Promise<UserData> => {
      const { data } = await Axios.get("/auth/me");
      return data;
    },
  };
};
