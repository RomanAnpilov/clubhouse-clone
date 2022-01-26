import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { Axios } from "../core/axios";
import { UserApi } from "../api/UserApi";
import { UserData } from "../pages";

export const checkAuth = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(ctx);
    if (cookies.token) {
      Axios.defaults.headers["Authorization"] = `Bearer ${cookies.token}`;
      Axios.defaults["Authorization"] = `Bearer ${cookies.token}`;
    }
    const user = await UserApi;
    return user;
  } catch (error) {
    return false;
  }
};
