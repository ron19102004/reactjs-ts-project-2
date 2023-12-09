/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ToastOptions } from "react-toastify";
import { URL } from "../../../helpers/constant";

class BookingUserController {
  async booking(
    payload: {
      user_service_id: number;
      admin_id: number;
      user_id: number;
      note: string;
      appointment_date: string;
    },
    toast: { toast: any; options: ToastOptions },
    token: string
  ) {
    try {
        const response = await axios.post(
          `${URL}/booking/user/${payload.user_id}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status !== 200) {
          toast.toast.error(response.data.message, toast.options);
          return false;
        }
        toast.toast.success("Đặt lịch thành công. Vui lòng vô tài khoản của bạn để kiểm tra", toast.options);
        return true;
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 401) {
          toast.toast.info("Hết phiên làm việc vui lòng đăng nhập lại", toast.options);
        }
        return false
      }
  }
  async getAllMyBookings(
    user_id: number,
    token: string
  ) {
    try {
      const response = await axios.post(
        `${URL}/booking/user/all/${user_id}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.status !== 200) {
        console.log(response);
        return [];
      }
      return response.data.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
    return [];
  }
}
export const BookingUserModuleController: BookingUserController =
  new BookingUserController();
