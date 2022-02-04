import { GetServerSidePropsContext } from "next";
import axios from "axios";
import Cookies from "nookies";
import { UserApi } from "./UserApi";
import { RoomApi } from "./RoomApi";

type ApiReturnType = ReturnType<typeof UserApi> & ReturnType<typeof RoomApi>;

export const API = (ctx: GetServerSidePropsContext): ApiReturnType => {
  const token = Cookies.get(ctx).token;
  const instance = axios.create({
    baseURL: "http://localhost:3002",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return [UserApi, RoomApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ApiReturnType);
};
