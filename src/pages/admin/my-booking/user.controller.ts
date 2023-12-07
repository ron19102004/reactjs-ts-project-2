/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { URL } from "../../../helpers/constant";
import { EMethodsCheckUser } from "./create-booking";

class UserController {
  async getByCondition(payload: any, token: string, method: EMethodsCheckUser) {
    try {
      let url: string = `${URL}/users/id=${payload}`;
      if (method === EMethodsCheckUser.phone)
        url = `${URL}/users/phoneNumber=${payload}`;
      else if (method === EMethodsCheckUser.email)
        url = `${URL}/users/email=${payload}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
}
export const UserModuleController: UserController = new UserController();
