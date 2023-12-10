/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  EditBranchModuleController,
  EditDepartmentModuleController,
} from "./edit-info.controller";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { ToastOptions, toast } from "react-toastify";
import { Loading } from "../my-booking";
const toastConfigs: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
const EditRowDepartmentLazy = React.lazy(() => import("./department-card"));
interface IEditDepartmentProps {
  admin_id: number;
  token: string;
}
const EditDepartment: React.FC<IEditDepartmentProps> = ({
  admin_id,
  token,
}) => {
  const [list, setList] = useState<any[]>([]);
  const [listBranch, setListBranch] = useState<any[]>([]);
  const [openAddDepartment, setOpenAddDepartment] = useState<boolean>(false);
  const changeStatusOpenAddDepartment = async () => {
    if (!openAddDepartment) {
      const listBranch = await EditBranchModuleController.getBranches();
      setListBranch(listBranch);
    }
    setOpenAddDepartment(!openAddDepartment);
  };
  const init = async () => {
    const response = await EditDepartmentModuleController.getDepartment();
    setList(response);
  };
  useEffect(() => {
    init();
  }, []);
  const handleDeleteItem = (id: number) => {
    let listCopy = [...list];
    listCopy = listCopy && listCopy.filter((x) => x.id !== id);
    setList(listCopy);
  };
  const createDepartment = async (e: any) => {
    changeStatusOpenAddDepartment();
    const payload = {
      name: e.name,
      description: e.description,
      duties: e.duties,
      equipment_system: e.equipment_system,
      treatment_techniques: e.treatment_techniques,
      avatar: e.avatar,
      branch_id: parseInt(e.branch_id),
    };
    if (payload.name.length === 0) {
      toast.warning("Vui lòng nhập tên khoa", toastConfigs);
      return;
    }
    await EditDepartmentModuleController.addDepartment(
      token,
      { toast: toast, options: toastConfigs },
      payload
    );
    setPayload({
      avatar: "",
      branch_id: 0,
      description: "",
      duties: "",
      equipment_system: "",
      name: "",
      treatment_techniques: "",
    });
    await init();
  };
  const [payload, setPayload] = useState<{
    name: string;
    description: string;
    duties: string;
    equipment_system: string;
    treatment_techniques: string;
    avatar: string;
    branch_id: number;
  }>({
    avatar: "",
    branch_id: 0,
    description: "",
    duties: "",
    equipment_system: "",
    name: "",
    treatment_techniques: "",
  });
  return (
    <article className="font-2 space-y-3">
      <section className="space-y-3 md:space-y-0 md:flex md:space-x-2 md:items-center">
        <h1 className="font-3 xl:text-2xl text-lg text-color2 pointer-events-none">
          Thông tin các khoa
        </h1>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={changeStatusOpenAddDepartment}
          >
            <span className="font-3">Thêm khoa mới</span>
          </Button>
          <Dialog
            open={openAddDepartment}
            onClose={changeStatusOpenAddDepartment}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              <span className="font-3 text-color2">Thêm khoa mới</span>
            </DialogTitle>
            <DialogContent>
              <div className="font-2">
                <label className="font-3 text-color2">Chi nhánh</label>
                <select
                  required
                  onChange={(e) => {
                    setPayload({
                      ...payload,
                      branch_id: parseInt(e.target.value),
                    });
                  }}
                  className="w-full h-10 outline-none border-2 rounded px-2"
                >
                  {listBranch &&
                    listBranch.map((x: any, index: number) => {
                      return (
                        <option key={index} value={x.id}>
                          {x.name}-{x.id}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="font-2">
                <label className="font-3 text-color2">Tên khoa</label>
                <input
                  type="text"
                  required
                  onChange={(e) => {
                    setPayload({ ...payload, name: e.target.value });
                  }}
                  className="w-full h-10 outline-none border-2 rounded px-2"
                  placeholder="Ví dụ: Khoa ngoại tổng hợp"
                />
              </div>
              <div className="font-2">
                <label className="font-3 text-color2">Nhiệm vụ</label>
                <ReactQuill
                  theme="snow"
                  value={payload.duties}
                  onChange={(e) => {
                    setPayload({ ...payload, duties: e });
                  }}
                  className="w-full outline-none rounded"
                />
              </div>
              <div className="font-2">
                <label className="font-3 text-color2">Mô tả</label>
                <ReactQuill
                  theme="snow"
                  value={payload.description}
                  onChange={(e) => {
                    setPayload({ ...payload, description: e });
                  }}
                  className="w-full outline-none rounded"
                />
              </div>
              <div className="font-2">
                <label className="font-3 text-color2">
                  Thiết bị & Hệ thống
                </label>
                <ReactQuill
                  theme="snow"
                  value={payload.equipment_system}
                  onChange={(e) => {
                    setPayload({ ...payload, equipment_system: e });
                  }}
                  className="w-full outline-none rounded"
                />
              </div>
              <div className="font-2">
                <label className="font-3 text-color2">Kỹ thuật điều trị</label>
                <ReactQuill
                  theme="snow"
                  value={payload.treatment_techniques}
                  onChange={(e) => {
                    setPayload({ ...payload, treatment_techniques: e });
                  }}
                  className="w-full outline-none rounded"
                />
              </div>
              <div className="font-2">
                <label className="font-3 text-color2">Ảnh khoa</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPayload({ ...payload, avatar: e.target.value });
                  }}
                  className="w-full h-10 outline-none border-2 rounded px-2"
                  placeholder="Ví dụ: https://..."
                />
              </div>
              <DialogActions>
                <Button
                  onClick={changeStatusOpenAddDepartment}
                  color="secondary"
                >
                  <span className="font-3">Hủy</span>
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    createDepartment(payload);
                  }}
                  color="primary"
                >
                  <span className="font-3">Thêm</span>
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </section>
      <section className="overflow-x-auto h-screen overflow-y-auto">
        <table className="branches-table min-w-full">
          <thead className="bg-color2 text-color7">
            <tr className="font-3">
              <th className="">Mã số khoa</th>
              <th className="">Mã chi nhánh</th>
              <th className="">Tên khoa</th>
              <th className="">Link ảnh</th>
              <th className="">Nhiệm vụ</th>
              <th className="">Mô tả</th>
              <th className="">Kỹ thuật điều trị</th>
              <th className="">Thiết bị & hệ thống</th>
              <th className="">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item: any, index: number) => {
                return (
                  <Suspense key={index} fallback={<Loading />}>
                    <EditRowDepartmentLazy
                      admin_id={admin_id}
                      item={item}
                      token={token}
                      handleDeleteItem={handleDeleteItem}
                    />
                  </Suspense>
                );
              })}
          </tbody>
        </table>
      </section>
    </article>
  );
};
export default EditDepartment;
