import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { Axios } from "../core/axios";
import { API } from "../api";
import { UserData } from "../pages";

export const checkAuth = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const user = await API(ctx).getMe();
    return user;
  } catch (error) {
    return false;
  }
};
