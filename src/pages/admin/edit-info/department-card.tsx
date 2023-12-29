/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { EditDepartmentModuleController } from "./edit-info.controller";
import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { ToastOptions, toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
    branch_id: item.branch.id,
    description: item.description,
    duties: item.duties,
    equipment_system: item.equipment_system,
    id: item.id,
    name: item.name,
    treatment_techniques: item.treatment_techniques,
    avatar: item.avatar,
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
    <tr className="h-48 font-sans">
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
      <td className={`${isEdit ? " bg-color1" : ""}`}>
        <div className="h-48 overflow-auto">
          <CKEditor
            disabled={!isEdit}
            editor={ClassicEditor}
            data={details.duties}
            onChange={(e, editor) => {
              setDetails({ ...details, duties: editor.getData() });
            }}
          />
        </div>
      </td>
      <td className={`${isEdit ? " bg-color1 " : ""}`}>
        <div className="h-48 overflow-auto">
          <CKEditor
            disabled={!isEdit}
            editor={ClassicEditor}
            data={details.description}
            onChange={(e, editor) => {
              setDetails({ ...details, description: editor.getData() });
            }}
          />
        </div>
      </td>
      <td className={` ${isEdit ? " bg-color1 " : ""}`}>
        <div className="h-48 overflow-auto">
          <CKEditor
            disabled={!isEdit}
            editor={ClassicEditor}
            data={details.treatment_techniques}
            onChange={(e, editor) => {
              setDetails({
                ...details,
                treatment_techniques: editor.getData(),
              });
            }}
          />
        </div>
      </td>
      <td className={`${isEdit ? " bg-color1" : ""}`}>
        <div className="h-48 overflow-auto">
          <CKEditor
            disabled={!isEdit}
            editor={ClassicEditor}
            data={details.equipment_system}
            onChange={(e, editor) => {
              setDetails({ ...details, equipment_system: editor.getData() });
            }}
          />
        </div>
      </td>
      <td className="space-y-1 p-1">
        {isEdit ? (
          <>
            <div>
              <button
                type="button"
                onClick={changeDialogEdit}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
              >
                <span className="font-7">Lưu</span>
              </button>
              <Dialog
                open={openDialogEdit}
                onClose={changeDialogEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <span className="font73">
                    {"Bạn có chắc chắn muốn lưu chỉnh sửa này không?"}
                  </span>
                </DialogTitle>
                <DialogActions>
                  <button
                    onClick={changeDialogEdit}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
                  >
                    <span className="font-7">Hủy</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
                  >
                    <span className="font-7">Đồng ý</span>
                  </button>
                </DialogActions>
              </Dialog>
            </div>
            <button
              onClick={handleCancelEdit}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
            >
              <span className="font-7">Hủy</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={changeStatusIsEdit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
            >
              <span className="font-7">Sửa</span>
            </button>
            <div>
              <button
                onClick={changeDialogDelete}
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
              >
                <span className="font-7">Xóa</span>
              </button>
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
                  <button
                    onClick={changeDialogDelete}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
                  >
                    <span className="font-7">Hủy</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDelete}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
                  >
                    <span className="font-7">Đồng ý</span>
                  </button>
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
