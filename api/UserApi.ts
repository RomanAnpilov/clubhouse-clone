import { Axios } from "../core/axios";
import { UserData } from "../pages";

export const UserApi = {
  getMe: (): Promise<UserData> => {
      try {
       return Axios.get("/auth/me")
      } catch (error) {
          console.log(error);
      }},
};
