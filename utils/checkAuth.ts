import { GetServerSidePropsContext } from "next";
import Cookies from "nookies";
import { Axios } from "../core/axios";
import { UserApi } from "../api/UserApi";

export const checkAuth = async (
  ctx: GetServerSidePropsContext
): Promise<boolean> => {
  try {
    const cookies = await Cookies.get(ctx);
    console.log(cookies.token, "I FUCK ADOLF");
    if (cookies.token) {
      Axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.token}`;
    }
    const user = await UserApi.getMe();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
