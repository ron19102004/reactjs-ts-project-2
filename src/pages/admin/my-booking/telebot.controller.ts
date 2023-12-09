/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ToastOptions } from "react-toastify";
import { URL } from "../../../helpers/constant";

class TelebotController {
  async sendMessage(
    token: string,
    phoneNumber: string,
    message: string,
    toast: { toast: any; options: ToastOptions }
  ) {
    try {
      await axios.post(
        `${URL}/telebot/sendMessage`,
        {
          phoneNumber: phoneNumber,
          message: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.toast.success("Gửi thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        toast.toast.info("Hết phiên làm việc vui lòng đăng nhập lại", toast.options);
      }
    }
  }
}
export const TelebotModuleController: TelebotController =
  new TelebotController();
