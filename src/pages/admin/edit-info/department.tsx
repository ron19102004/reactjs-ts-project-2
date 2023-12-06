/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  EditBranchModuleController,
  EditDepartmentModuleController,
} from "./edit-info.controller";
import editIcon from "../../../assets/edit.png";
import checkedIcon from "../../../assets/checked.png";
import closeIcon from "../../../assets/reject.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { ToastOptions, toast } from "react-toastify";
import { useForm } from "react-hook-form";
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
const icons = {
  edit: <img src={editIcon} alt="edit" className="w-5" />,
  check: <img src={checkedIcon} alt="check" className="w-5" />,
  close: <img src={closeIcon} alt="close" className="w-5" />,
};
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
  const { handleSubmit, register, reset } = useForm();
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
    const payload = {
      name: e.name,
      description: e.description,
      duties: e.duties,
      equipment_system: e.equipment_system,
      treatment_techniques: e.treatment_techniques,
      avatar: e.avatar,
      branch_id: parseInt(e.branch_id),
    };
    await EditDepartmentModuleController.addDepartment(
      token,
      { toast: toast, options: toastConfigs },
      payload
    );
    reset();
    changeStatusOpenAddDepartment();
    const response = await EditDepartmentModuleController.getDepartment();
    setList(response);
  };
  return (
    <article className="font-2 space-y-3">
      <section className="space-y-3 md:space-y-0 md:flex md:space-x-2 md:items-center">
        <h1 className="font-3 xl:text-2xl text-lg text-color2">
          Thông tin các khoa
        </h1>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={changeStatusOpenAddDepartment}
          >
            Thêm khoa mới
          </Button>
          <Dialog
            open={openAddDepartment}
            onClose={changeStatusOpenAddDepartment}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Thêm khoa mới</DialogTitle>
            <form
              onSubmit={handleSubmit(createDepartment)}
              className="text-color2"
            >
              <DialogContent>
                <div className="font-2">
                  <label>Chi nhánh</label>
                  <select
                    required
                    {...register("branch_id")}
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
                  <label>Tên khoa</label>
                  <input
                    type="text"
                    required
                    {...register("name")}
                    className="w-full h-10 outline-none border-2 rounded px-2"
                    placeholder="Ví dụ: Khoa ngoại tổng hợp"
                  />
                </div>
                <div className="font-2">
                  <label>Nhiệm vụ</label>
                  <textarea
                    required
                    {...register("duties")}
                    className="w-full h-32 outline-none border-2 rounded px-2"
                  />
                </div>
                <div className="font-2">
                  <label>Mô tả</label>
                  <textarea
                    required
                    {...register("description")}
                    className="w-full h-32 outline-none border-2 rounded px-2"
                  />
                </div>
                <div className="font-2">
                  <label>Thiết bị & Hệ thống</label>
                  <textarea
                    required
                    {...register("equipment_system")}
                    className="w-full h-32 outline-none border-2 rounded px-2"
                  />
                </div>
                <div className="font-2">
                  <label>Kỹ thuật điều trị</label>
                  <textarea
                    required
                    {...register("treatment_techniques")}
                    className="w-full h-32 outline-none border-2 rounded px-2"
                  />
                </div>
                <div className="font-2">
                  <label>Ảnh khoa</label>
                  <input
                    type="text"
                    {...register("avatar")}
                    className="w-full h-10 outline-none border-2 rounded px-2"
                    placeholder="Ví dụ: https://..."
                  />
                </div>
                <DialogActions>
                  <Button
                    onClick={changeStatusOpenAddDepartment}
                    color="secondary"
                  >
                    Hủy
                  </Button>
                  <Button type="submit" color="primary">
                    Thêm
                  </Button>
                </DialogActions>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </section>
      <section className="overflow-x-auto">
        <table className="branches-table min-w-full">
          <thead className="bg-color2 text-color7">
            <tr className="font-3">
              <th className="">Mã số khoa</th>
              <th className="">Mã chi nhánh</th>
              <th className="">Tên khoa</th>
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
                  <EditRowDepartment
                    key={index}
                    admin_id={admin_id}
                    item={item}
                    token={token}
                    handleDeleteItem={handleDeleteItem}
                  />
                );
              })}
          </tbody>
        </table>
      </section>
    </article>
  );
};
export interface IDetailsDepartment {
  name: string;
  description: string;
  duties: string;
  id: number;
  treatment_techniques: string;
  equipment_system: string;
  branch_id: number;
}
const EditRowDepartment: React.FC<{
  item: any;
  admin_id: number;
  token: string;
  handleDeleteItem: (id: number) => void;
}> = ({ item, token, handleDeleteItem }) => {
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const changeDialogDelete = () => {
    setOpenDialogDelete(!openDialogDelete);
  };
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const changeDialogEdit = () => {
    setOpenDialogEdit(!openDialogEdit);
  };

  const [details, setDetails] = useState<IDetailsDepartment>({
    branch_id: 0,
    description: "",
    duties: "",
    equipment_system: "",
    id: 0,
    name: "",
    treatment_techniques: "",
  });
  const [detailsBackup, setDetailsBackup] = useState<IDetailsDepartment>({
    branch_id: 0,
    description: "",
    duties: "",
    equipment_system: "",
    id: 0,
    name: "",
    treatment_techniques: "",
  });

  const init = () => {
    setDetails({
      branch_id: item.branch.id,
      description: item.description,
      duties: item.duties,
      equipment_system: item.equipment_system,
      id: item.id,
      name: item.name,
      treatment_techniques: item.treatment_techniques,
    });
  };
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const changeStatusIsEdit = () => {
    if(!isEdit){
        setDetailsBackup(details);
    }
    setIsEdit(!isEdit);
  };
  const handleSave = async () => {
    await EditDepartmentModuleController.updateDepartment(details, token, {
      toast: toast,
      options: toastConfigs,
    });
    setIsEdit(!isEdit);
    setDetailsBackup(details);
  };
  const handleCancelEdit = () => {
    setDetails(detailsBackup);
    setIsEdit(!isEdit);
  };
  const handleDelete = async () => {
    await EditDepartmentModuleController.deleteDepartments(details.id, token, {
      toast: toast,
      options: toastConfigs,
    });
    handleDeleteItem(details.id);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <tr>
      <td className={`${isEdit ? "bg-color3 text-white" : ""}`}>
        {details.id}
      </td>
      <td className={`${isEdit ? "bg-color3 text-white" : ""}`}>
        {details.branch_id}
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <input
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          type="text"
          value={details.name}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, name: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <textarea
          cols={30}
          rows={5}
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          value={details.duties}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, duties: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <textarea
          cols={30}
          rows={5}
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          value={details.description}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, description: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <textarea
          cols={30}
          rows={5}
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          value={details.treatment_techniques}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, treatment_techniques: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <textarea
          cols={30}
          rows={5}
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          value={details.equipment_system}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, equipment_system: e.target.value });
          }}
        />
      </td>
      <td className="space-y-1 p-1">
        {isEdit ? (
          <>
            <div>
              <Button
                variant="contained"
                color="primary"
                className="w-full"
                onClick={changeDialogEdit}
              >
                {icons.check}
                <span>Lưu</span>
              </Button>
              <Dialog
                open={openDialogEdit}
                onClose={changeDialogEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Bạn có chắc chắn muốn lưu chỉnh sửa này không?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={changeDialogEdit} color="secondary">
                    Hủy
                  </Button>
                  <Button onClick={handleSave} color="primary" autoFocus>
                    Đồng ý
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <Button
              variant="contained"
              color="secondary"
              className="w-full"
              onClick={handleCancelEdit}
            >
              {icons.close}
              <span>Hủy</span>
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              className="w-full"
              onClick={changeStatusIsEdit}
            >
              {icons.edit}
              <span>Sửa</span>
            </Button>
            <div>
              <Button
                variant="contained"
                color="secondary"
                className="w-full"
                onClick={changeDialogDelete}
              >
                {icons.close}
                <span>Xóa</span>
              </Button>
              <Dialog
                open={openDialogDelete}
                onClose={changeDialogDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Bạn có chắc chắn muốn xóa khoa này không?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={changeDialogDelete} color="secondary">
                    Hủy
                  </Button>
                  <Button onClick={handleDelete} color="primary" autoFocus>
                    Đồng ý
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </>
        )}
      </td>
    </tr>
  );
};
export default EditDepartment;
