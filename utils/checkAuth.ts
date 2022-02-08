import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { Axios } from "../core/axios";
import { API } from "../api";
import { UserData } from "../pages";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "../redux/types";
import { setUserData } from "../redux/slices/userSlice";

export const checkAuth = async (
  ctx: any, store: Store<RootState>
): Promise<UserData | null> =>
 {
  try {
    const user = await API(ctx).getMe();
    store.dispatch(setUserData(user))
    return user;
  } catch (error) {
    return null;
  }
};
