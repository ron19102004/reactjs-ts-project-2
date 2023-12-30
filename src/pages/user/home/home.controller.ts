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
  async getFeedbackReply(idFeedBack: number) {
    try {
      const res = await axios.get(`${URL}/feedback/reply_id=${idFeedBack}`);
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
  async addFeedback(
    payload: { subject: string; content: string },
    token: string,
    user_id: number
  ) {
    try {
      const res = await axios.post(`${URL}/feedback/${user_id}`, payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async addFeedbackReply(
    content: string,
    token: string,
    user_id: number,
    reply_id: number,
    user_be_reply_id: number
  ) {
    try {
      const res = await axios.post(
        `${URL}/feedback/${user_id}/reply_id=${reply_id}&id_user_be_reply=${user_be_reply_id}`,
        { content: content },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
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
  async del(token: string, admin_id: number, fbId: number) {
    try {
      await axios.delete(`${URL}/feedback/${admin_id}/feedbackId=${fbId}`, {
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
