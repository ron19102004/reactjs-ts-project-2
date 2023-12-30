import axios from "axios";
import { URL } from "../../../helpers/constant";

class NotifyControllerUser {
  async getNotifications(
    id_user: number,
    limit: { take: number; skip: number },
    token: string
  ) {
    try {
      const res = await axios.get(
        `${URL}/message/myID=${id_user}/take=${limit.take}&skip=${limit.skip}`,
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
  async countSeenYet(
    id_user: number,
    token: string
  ) {
    try {
      const res = await axios.get(
        `${URL}/message/myID=${id_user}/seen-yet`,
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
  async getNotificationsSeenYet(
    id_user: number,
    token: string
  ) {
    try {
      const res = await axios.get(
        `${URL}/message/myID=${id_user}`,
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
  async actMess(id_user: number, listIdActMess: number[], token: string) {
    try {
      const res = await axios.post(
        `${URL}/message/myID=${id_user}`,
        { id_mess: listIdActMess },
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
  async actMessAll(id_user: number, token: string) {
    try {
      const res = await axios.post(
        `${URL}/message/myID=${id_user}/all`,
        { },
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
}
export const NotifyModuleControllerUser: NotifyControllerUser =
  new NotifyControllerUser();
