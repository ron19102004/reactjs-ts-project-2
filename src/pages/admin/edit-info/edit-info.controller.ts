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
class EditInfoController
  implements IEditBranches, IEditDepartment, IEditService
{
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
      toast.toast.error(
        "Đã có lỗi sảy ra khi cập nhật. Vui lòng thử lại",
        toast.options
      );
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
      toast.toast.error(
        "Đã có lỗi sảy ra khi cập nhật. Vui lòng thử lại",
        toast.options
      );
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
      toast.toast.error(
        "Đã có lỗi sảy ra khi cập nhật. Vui lòng thử lại",
        toast.options
      );
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
      toast.toast.error(
        "Đã có lỗi sảy ra khi xóa. Vui lòng thử lại",
        toast.options
      );
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
      toast.toast.error(
        "Đã có lỗi sảy ra khi xóa. Vui lòng thử lại",
        toast.options
      );
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
      toast.toast.error(
        "Đã có lỗi sảy ra khi xóa. Vui lòng thử lại",
        toast.options
      );
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
      toast.toast.error(
        "Đã có lỗi sảy ra khi thêm chi nhánh. Vui lòng thử lại",
        toast.options
      );
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
      toast.toast.error(
        "Đã có lỗi sảy ra khi thêm dịch vụ. Vui lòng thử lại",
        toast.options
      );
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
      toast.toast.error(
        "Đã có lỗi sảy ra khi thêm khoa. Vui lòng thử lại",
        toast.options
      );
    }
  }
}
export const EditBranchModuleController: IEditBranches =
  new EditInfoController();
export const EditDepartmentModuleController: IEditDepartment =
  new EditInfoController();
export const EditServiceModuleController: IEditService =
  new EditInfoController();
