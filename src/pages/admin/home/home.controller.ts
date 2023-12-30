/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { URL } from "../../../helpers/constant";
class HomeAdminController {
  async analyticDate(admin_id: number, token: string, date: string) {
    try {
      const response = await axios.get(
        `${URL}/booking-analytic/adminId=${admin_id}/date=${date}`,
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
  async analyticMonth(
    admin_id: number,
    token: string,
    month: string,
    year: string
  ) {
    try {
      const response = await axios.get(
        `${URL}/booking-analytic/adminId=${admin_id}/month=${month}&year=${year}`,
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
  async getStatus() {
    try {
      const res = await axios.get(`${URL}/status`);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async getStatusByName(name: string) {
    try {
      const res = await axios.get(`${URL}/status/name=${name}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async changeStatusById(id: number, token: string) {
    try {
      const res = await axios.put(`${URL}/status/id=${id}`,{}, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async addStatus(payload: { name: string; value: boolean }, token: string) {
    try {
      const res = await axios.post(`${URL}/status`, payload, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export const HomeAdminModuleController: HomeAdminController =
  new HomeAdminController();
