/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { URL } from "../../../helpers/constant";
import { IDetailsBranch } from "./branches";
import { ToastOptions } from "react-toastify";
import { IDetailsDepartment } from "./department";
import { IDetailsService } from "./services";
interface IEditBranches {
  getBranches(): Promise<any>;
  updateBranches(
    iDetailsBranch: IDetailsBranch,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ): Promise<any>;
  deleteBranches(
    id: number,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ): Promise<any>;
  addBranch(
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    },
    payload: any
  ): Promise<any>;
}
interface IEditDepartment {
  updateDepartment(
    iDetailsDepartment: IDetailsDepartment,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ): Promise<any>;
  getDepartment(): Promise<any>;
  addDepartment(
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    },
    payload: any
  ): Promise<any>;
  deleteDepartments(
    id: number,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ): Promise<any>;
}
interface IEditService {
  updateService(
    iDetailsService: IDetailsService,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ): Promise<any>;
  getService(): Promise<any>;
  addService(
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    },
    payload: any
  ): Promise<any>;
  deleteService(
    id: number,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ): Promise<any>;
}
interface IEditUserService {
  getAdminAndServiceForAd(admin_id: number, token: string): Promise<any>;
  getAdminAndService(): Promise<any>;
  removeAdminAndService(
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    },
    id: number
  ): Promise<any>;
  addUserService(
    payload: { user_id: number; service_id: number },
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ): Promise<any>;
}
class EditInfoController
  implements IEditBranches, IEditDepartment, IEditService, IEditUserService
{
  async addUserService(
    payload: { user_id: number; service_id: number },
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ) {
    try {
      const response = await axios.post(`${URL}/users-services`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      toast.toast.success("Thêm thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
  async getAdminAndService() {
    try {
      const response = await axios.get(`${URL}/users-services/`);
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
    return [];
  }
  async getAdminAndServiceForAd(admin_id: number, token: string): Promise<any> {
    try {
      const response = await axios.get(
        `${URL}/users-services/admin_id=${admin_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
    return [];
  }
  async getService(): Promise<any> {
    try {
      const response = await axios.get(`${URL}/services`);
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
    return [];
  }
  async getDepartment(): Promise<any> {
    try {
      const response = await axios.get(`${URL}/departments`);
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
    return [];
  }
  async getBranches() {
    try {
      const response = await axios.get(`${URL}/branches`);
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
    return [];
  }
  async updateBranches(
    iDetailsBranch: IDetailsBranch,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ) {
    try {
      const response = await axios.put(`${URL}/branches`, iDetailsBranch, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      toast.toast.success("Cập nhật thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
  async updateService(
    iDetailsService: IDetailsService,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ) {
    try {
      const { department_id, ...payload } = iDetailsService;
      const response = await axios.put(`${URL}/services`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      toast.toast.success("Cập nhật thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
  async updateDepartment(
    iDetailsDepartment: IDetailsDepartment,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ) {
    try {
      const { branch_id, ...payload } = iDetailsDepartment;
      const response = await axios.put(`${URL}/departments`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      toast.toast.success("Cập nhật thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
  async deleteBranches(
    id: number,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ) {
    try {
      const response = await axios.delete(`${URL}/branches/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      toast.toast.success("Xóa thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
  async removeAdminAndService(
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    },
    id: number
  ) {
    try {
      await axios.delete(`${URL}/users-services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      });
      toast.toast.success("Xóa thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
  async deleteService(
    id: number,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ) {
    try {
      const response = await axios.delete(`${URL}/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      toast.toast.success("Xóa thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
  async deleteDepartments(
    id: number,
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    }
  ) {
    try {
      const response = await axios.delete(`${URL}/departments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      toast.toast.success("Xóa thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
  async addBranch(
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    },
    payload: any
  ) {
    try {
      const response = await axios.post(`${URL}/branches`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      toast.toast.success("Thêm chi nhánh thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
  async addService(
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    },
    payload: any
  ) {
    try {
      const response = await axios.post(`${URL}/services`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      toast.toast.success("Thêm dịch vụ thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
  async addDepartment(
    token: string,
    toast: {
      toast: any;
      options: ToastOptions;
    },
    payload: any
  ) {
    try {
      const response = await axios.post(`${URL}/departments`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      toast.toast.success("Thêm chi khoa thành công", toast.options);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Hết phiên làm việc vui lòng đăng nhập lại");
      }
    }
  }
}
export const EditBranchModuleController: IEditBranches =
  new EditInfoController();
export const EditDepartmentModuleController: IEditDepartment =
  new EditInfoController();
export const EditServiceModuleController: IEditService =
  new EditInfoController();
export const EditUserServiceModuleController: IEditUserService =
  new EditInfoController();
