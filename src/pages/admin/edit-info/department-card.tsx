/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EditDepartmentModuleController } from "./edit-info.controller";
import editIcon from "../../../assets/edit.png";
import checkedIcon from "../../../assets/checked.png";
import closeIcon from "../../../assets/reject.png";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { ToastOptions, toast } from "react-toastify";
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
export interface IDetailsDepartment {
  name: string;
  description: string;
  duties: string;
  id: number;
  treatment_techniques: string;
  equipment_system: string;
  branch_id: number;
  avatar: string;
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
    branch_id: item.branch.id,
    description: item.description,
    duties: item.duties,
    equipment_system: item.equipment_system,
    id: item.id,
    name: item.name,
    treatment_techniques: item.treatment_techniques,
    avatar: item.avatar,
  });
  const [detailsBackup, setDetailsBackup] = useState<IDetailsDepartment>({
    branch_id: 0,
    description: "",
    duties: "",
    equipment_system: "",
    id: 0,
    name: "",
    treatment_techniques: "",
    avatar: "",
  });

  const init = () => {};
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const changeStatusIsEdit = () => {
    if (!isEdit) {
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
    setIsEdit(!isEdit);
    setDetails(detailsBackup);
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
    <tr className="h-48">
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
        <input
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          type="url"
          value={details.avatar}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, avatar: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        {isEdit ? (
          <ReactQuill
            theme="snow"
            value={details.duties}
            onChange={(e) => {
              setDetails({ ...details, duties: e });
            }}
            className="h-36 w-[500px] -translate-y-5"
          />
        ) : (
          <ReactQuill
            theme="snow"
            value={details.duties}
            className="h-36 w-[500px] -translate-y-5"
          />
        )}
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        {isEdit ? (
          <ReactQuill
            theme="snow"
            value={details.description}
            onChange={(e) => {
              setDetails({ ...details, description: e });
            }}
            className="h-36 w-[500px] -translate-y-5"
          />
        ) : (
          <ReactQuill
            theme="snow"
            value={details.description}
            className="h-36 w-[500px] -translate-y-5"
          />
        )}
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        {isEdit ? (
          <ReactQuill
            theme="snow"
            value={details.treatment_techniques}
            onChange={(e) => {
              setDetails({ ...details, treatment_techniques: e });
            }}
            className="h-36 w-[500px] -translate-y-5"
          />
        ) : (
          <ReactQuill
            theme="snow"
            value={details.treatment_techniques}
            className="h-36 w-[500px] -translate-y-5"
          />
        )}
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        {isEdit ? (
          <ReactQuill
            theme="snow"
            value={details.equipment_system}
            onChange={(e) => {
              setDetails({ ...details, equipment_system: e });
            }}
            className="h-36 w-[500px] -translate-y-5"
          />
        ) : (
          <ReactQuill
            theme="snow"
            value={details.equipment_system}
            className="h-36 w-[500px] -translate-y-5"
          />
        )}
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
                <span className="font-3">Lưu</span>
              </Button>
              <Dialog
                open={openDialogEdit}
                onClose={changeDialogEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <span className="font-3">
                    {"Bạn có chắc chắn muốn lưu chỉnh sửa này không?"}
                  </span>
                </DialogTitle>
                <DialogActions>
                  <Button onClick={changeDialogEdit} color="secondary">
                    <span className="font-3">Hủy</span>
                  </Button>
                  <Button onClick={handleSave} color="primary" autoFocus>
                    <span className="font-3">Đồng ý</span>
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
              <span className="font-3">Hủy</span>
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
              <span className="font-3">Sửa</span>
            </Button>
            <div>
              <Button
                variant="contained"
                color="secondary"
                className="w-full"
                onClick={changeDialogDelete}
              >
                {icons.close}
                <span className="font-3">Xóa</span>
              </Button>
              <Dialog
                open={openDialogDelete}
                onClose={changeDialogDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <span className="font-3">
                    {"Bạn có chắc chắn muốn xóa khoa này không?"}
                  </span>
                </DialogTitle>
                <DialogActions>
                  <Button onClick={changeDialogDelete} color="secondary">
                    <span className="font-3">Hủy</span>
                  </Button>
                  <Button onClick={handleDelete} color="primary" autoFocus>
                    <span className="font-3">Đồng ý</span>
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
export default EditRowDepartment;
