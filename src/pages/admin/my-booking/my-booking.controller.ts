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
  async confirm(
    toast: { toast: any; options: ToastOptions },
    token: string,
    payload: {
      bid: number;
      admin_id: number;
      code: number;
    }
  ) {
    try {
      const response = await axios.post(
        `${URL}/booking/admin=${payload.admin_id}/bookingID=${payload.bid}&code=${payload.code}`,
        {},
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
      toast.toast.success(response.data.message, toast.options);
      return true;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        toast.toast.info("Hết phiên làm việc vui lòng đăng nhập lại", toast.options);
      }
      return false;
    }
  }
  async refreshCode(
    toast: { toast: any; options: ToastOptions },
    token: string,
    payload: {
      bid: number;
      admin_id: number;
    }
  ) {
    try {
      const response = await axios.post(
        `${URL}/booking/admin=${payload.admin_id}/bookingID=${payload.bid}/refresh-code`,
        {},
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
      toast.toast.success(response.data.message, toast.options);
      return true;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        toast.toast.info("Hết phiên làm việc vui lòng đăng nhập lại", toast.options);
      }
      return false;
    }
  }
  async addBooking(
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
        `${URL}/booking/admin/${payload.admin_id}`,
        payload,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.status !== 200) {
        console.log(response);
        toast.toast.error(response.data.message, toast.options);
        return false;
      }
      toast.toast.success("Thêm thành công", toast.options);
      return true;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        toast.toast.info("Hết phiên làm việc vui lòng đăng nhập lại", toast.options);
      }
      return false;
    }
  }
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
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
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
        return false;
      }
      toast.toast.success(`${response.data.message}`, toast.options);
      return true;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        toast.toast.info("Hết phiên làm việc vui lòng đăng nhập lại", toast.options);
      }
      return false;
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
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
    return false;
  }
  async getAllMyBookingsByCondition(
    admin_id: number,
    limit: { take?: number; skip?: number },
    condition: {
      rejected: boolean;
      finished: boolean;
      accepted: boolean;
      confirmed: boolean;
    },
    token: string
  ) {
    try {
      const response = await axios.get(
        `${URL}/booking/admin/${admin_id}/accepted=${condition.accepted}&rejected=${condition.rejected}&finished=${condition.finished}&confirmed=${condition.confirmed}/skip=${limit.skip}&take=${limit.take}`,
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
  async updateNote(
    admin_id: number,
    token: string,
    note: string,
    booking_id: number,
    toast: { toast: any; options: ToastOptions }
  ) {
    try {
      const response = await axios.put(
        `${URL}/booking/admin=${admin_id}/update-note`,
        {
          booking_id: booking_id,
          note: note,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.status !== 200) {
        toast.toast.error(`${response.data.message}`, toast.options);
      }
      toast.toast.success(`${response.data.message}`, toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
      toast.toast.error(`${error.message}`, toast.options);
    }
    return [];
  }
}
export const MyBookingAdminModuleController: MyBookingAdminController =
  new MyBookingAdminController();
