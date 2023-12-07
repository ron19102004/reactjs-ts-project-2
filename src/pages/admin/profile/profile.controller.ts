/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { IDetailsUser } from "./my-profile";
import { ToastOptions } from "react-toastify";
import { URL } from "../../../helpers/constant";
class ProfileController {
  async updateProfile(
    payload: IDetailsUser,
    toast: { toast: any; options: ToastOptions },
    token: string,
    id: number
  ) {
    try {
      const res = await axios.put(`${URL}/users/${id}`, payload, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      });
      if(res.data.status !== 200){
        toast.toast.error(`${res.data.message}`,toast.options);
        return false;
      }
      toast.toast.success(`${res.data.message}`,toast.options);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
export const ProfileModuleController: ProfileController =
  new ProfileController();
