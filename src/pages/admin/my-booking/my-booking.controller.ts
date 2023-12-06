/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { URL } from "../../../helpers/constant";
import { ToastOptions } from "react-toastify";
export enum EAction {
  ACCEPT = "accept",
  REJECT = "reject",
  FINISH = "finish",
}
class MyBookingAdminController {
  async getAllMyBookings(
    admin_id: number,
    limit: { take?: number; skip?: number },
    token: string
  ) {
    try {
      const response = await axios.post(
        `${URL}/booking/admin/all/${admin_id}/deleted=false`,
        {
          skip: limit?.skip ?? 0,
          take: limit?.take ?? 15,
        },
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
    }
    return [];
  }
  async handleMyBookings(
    admin_id: number,
    token: string,
    booking_id: number,
    action: EAction,
    toast: { toast: any; options: ToastOptions }
  ) {
    try {
      const response = await axios.post(
        `${URL}/booking/admin/id=${admin_id}&bookingID=${booking_id}/action=${action}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.status !== 200) {
        toast.toast.error(`${response.data.message}`, toast.options);
        return;
      }
      toast.toast.success(`${response.data.message}`, toast.options);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllBookingForSearch(admin_id: number, token: string) {
    try {
      const response = await axios.get(
        `${URL}/booking/admin/all/${admin_id}/deleted=false`,
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
    }
    return [];
  }
  async deleteByIdBooking(admin_id: number, token: string, booking_id: number) {
    try {
      const response = await axios.delete(
        `${URL}/booking/admin/adminId=${admin_id}&bookingId=${booking_id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );      
      if (response.data.status !== 200) {
        console.log(response);
        return false;
      }
      return true;
    } catch (error: any) {
      console.log(error);
    }
    return false;
  }
}
export const MyBookingAdminModuleController: MyBookingAdminController =
  new MyBookingAdminController();
