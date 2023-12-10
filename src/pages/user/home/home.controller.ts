import axios from "axios";
import { URL } from "../../../helpers/constant";

class HomeControllerUser {
  async getFeedback() {
    try {
      const res = await axios.get(`${URL}/feedback`);
      return res.data.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async getFeedbackForAdmin(admin_id: number, token: string) {
    try {
      const res = await axios.get(`${URL}/feedback/${admin_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return res.data.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async addFb(
    payload: { subject: string; content: string },
    token: string,
    user_id: number
  ) {
    try {
      await axios.post(`${URL}/feedback/${user_id}`, payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async confirm(token: string, admin_id: number, fbId: number) {
    try {
      await axios.get(`${URL}/feedback/${admin_id}/feedbackId=${fbId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
export const HomeModuleControllerUser: HomeControllerUser =
  new HomeControllerUser();
