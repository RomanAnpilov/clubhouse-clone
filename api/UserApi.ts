import { GetServerSidePropsContext } from "next";
import { Axios } from "../core/axios";
import { UserData } from "../pages";
import Cookies from "nookies";

export const UserApi = (ctx: GetServerSidePropsContext) => {
  const cookies = Cookies.get(ctx);
  const token = cookies.token;
  return {
    User: {
      getMe: async () => {
        const { data } = await Axios({
          method: "get",
          url: `auth/me`,
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      },
    },
  };
};
