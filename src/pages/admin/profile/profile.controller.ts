/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { IDetailsUser } from "./my-profile";
import { ToastOptions } from "react-toastify";
import { URL } from "../../../helpers/constant";
import { IDetailsRelationship, IDetailsWork } from "./accounts-admin";
class ProfileController {
  async upgradeRole(
    token: string,
    user_id: number,
    toast: { toast: any; options: ToastOptions }
  ) {
    try {
      const res = await axios.put(
        `${URL}/users/master/user_id=${user_id}/upgrade-role`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      );
      if (res.data.status !== 200) {
        toast.toast.error(`${res.data.message}`, toast.options);
        return false;
      }
      toast.toast.success(`${res.data.message}`, toast.options);
      return true;
    } catch (error: any) {
      toast.toast.error(`${error.message}`, toast.options);
      console.log(error);
      return false;
    }
  }
  async findAllAccountsForAdmin() {
    try {
      const res = await axios.get(`${URL}/users/allAdmin`);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async findAccountsForAdminById(id:number) {
    try {      
      const res = await axios.get(`${URL}/users/details-admin/id=${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async findAllAccountsForAdminSkipTake(skip: number, take: number) {
    try {
      const res = await axios.get(
        `${URL}/users/allAdmin/skip=${skip}&take=${take}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async findAllAccountsForUser(token: string) {
    try {
      const res = await axios.get(`${URL}/users/master/allUser`, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
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
      if (res.data.status !== 200) {
        toast.toast.error(`${res.data.message}`, toast.options);
        return false;
      }
      toast.toast.success(`${res.data.message}`, toast.options);
      return true;
    } catch (error:any) {
      console.log(error);
      if (error.response.status === 401) {
        toast.toast.info("Hết phiên làm việc vui lòng đăng nhập lại", toast.options);
      }
      return false;
    }
  }
  async updateProfileForMaster(
    payload: IDetailsUser,
    toast: { toast: any; options: ToastOptions },
    token: string
  ) {
    try {
      const res = await axios.put(
        `${URL}/users/update-infoself`,
        payload,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      );
      if (res.data.status !== 200) {
        toast.toast.error(`${res.data.message}`, toast.options);
        return false;
      }
      toast.toast.success(`${res.data.message}`, toast.options);
      return true;
    } catch (error:any) {
      if (error.response.status === 401) {
        toast.toast.info("Hết phiên làm việc vui lòng đăng nhập lại", toast.options);
      }
      console.log(error);
      return false;
    }
  }
  async updateInfoWorkForMaster(
    payload: IDetailsWork,
    toast: { toast: any; options: ToastOptions },
    token: string
  ) {
    try {
      const res = await axios.put(
        `${URL}/users/master/update-infowork`,
        payload,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      );
      if (res.data.status !== 200) {
        toast.toast.error(`${res.data.message}`, toast.options);
        return false;
      }
      toast.toast.success(`${res.data.message}`, toast.options);
      return true;
    } catch (error:any) {
      console.log(error);
      if (error.response.status === 401) {
        toast.toast.info("Hết phiên làm việc vui lòng đăng nhập lại", toast.options);
      }
      return false;
    }
  }
  async updateDepartmentBranch(
    payload: IDetailsRelationship,
    toast: { toast: any; options: ToastOptions },
    token: string
  ) {
    try {
      const res = await axios.put(
        `${URL}/users/master/update-branch-dep`,
        payload,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      );
      if (res.data.status !== 200) {
        toast.toast.error(`${res.data.message}`, toast.options);
        return false;
      }
      toast.toast.success(`${res.data.message}`, toast.options);
      return true;
    } catch (error:any) {
      console.log(error);
      if (error.response.status === 401) {
        toast.toast.info("Hết phiên làm việc vui lòng đăng nhập lại", toast.options);
      }
      return false;
    }
  }
}
export const ProfileModuleController: ProfileController =
  new ProfileController();
