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
      console.log(response);
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
      console.log(response);
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
}
export const HomeAdminModuleController: HomeAdminController =
  new HomeAdminController();
