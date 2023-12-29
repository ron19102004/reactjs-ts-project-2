/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { EditBranchModuleController } from "./edit-info.controller";
import {
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
interface IEditBranchesProps {
  admin_id: number;
  token: string;
}
const EditBranches: React.FC<IEditBranchesProps> = ({ admin_id, token }) => {
  const [list, setList] = useState<any[]>([]);
  const [openAddBranch, setOpenAddBranch] = useState<boolean>(false);
  const changeStatusOpenAddBranch = () => {
    setOpenAddBranch(!openAddBranch);
  };
  const { handleSubmit, register, reset } = useForm();
  const init = async () => {
    const response = await EditBranchModuleController.getBranches();
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
  const createBranch = async (e: any) => {
    changeStatusOpenAddBranch();
    await EditBranchModuleController.addBranch(
      token,
      { toast: toast, options: toastConfigs },
      e
    );
    reset();
    init();
  };
  return (
    <article className="font-7 space-y-3">
      <section className="space-y-3 md:space-y-0 md:flex md:space-x-2 md:items-center">
        <h1 className="font-7 xl:text-2xl text-lg text-color2 pointer-events-none">
          Thông tin các chi nhánh
        </h1>
        <div>
          <button
            type="button"
            onClick={changeStatusOpenAddBranch}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <span className="font-7">Thêm chi nhánh mới</span>
          </button>

          <Dialog
            open={openAddBranch}
            onClose={changeStatusOpenAddBranch}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              <span className="font-7 text-color2">Thêm chi nhánh mới</span>
            </DialogTitle>
            <form onSubmit={handleSubmit(createBranch)} className="text-color2">
              <DialogContent>
                <div className="font-4">
                  <label className="font-4">Tên chi nhánh</label>
                  <input
                    type="text"
                    required
                    {...register("name")}
                    className="w-full font-4 h-10 outline-none border-2 rounded px-2"
                    placeholder="Ví dụ: Bệnh viện đa khoa TDHospital"
                  />
                </div>
                <div className="font-4">
                  <label className="">Địa chỉ</label>
                  <input
                    type="text"
                    required
                    {...register("address")}
                    className="w-full h-10 outline-none border-2 rounded px-2"
                    placeholder="Ví dụ: Đà Nẵng"
                  />
                </div>
                <div className="font-4">
                  <label className="">Email</label>
                  <input
                    type="email"
                    required
                    {...register("email")}
                    className="w-full h-10 outline-none border-2 rounded px-2"
                    placeholder="Ví dụ: ron19102004@gmail.com"
                  />
                </div>
                <div className="font-4">
                  <label className="">Đường dây nóng</label>
                  <input
                    type="text"
                    required
                    {...register("hotline")}
                    className="w-full h-10 outline-none border-2 rounded px-2"
                    placeholder="Ví dụ: 0392477615"
                    pattern="(0|84)[0-9]{9}"
                  />
                </div>
                <div className="font-4">
                  <label className="font-4">Mô tả</label>
                  <textarea
                    {...register("description")}
                    className="w-full h-32 outline-none border-2 rounded px-2"
                  />
                </div>
                <div className="font-4">
                  <label className="">Link bản đồ</label>
                  <input
                    type="url"
                    {...register("src_map")}
                    className="w-full h-10 outline-none border-2 rounded px-2"
                    placeholder="Ví dụ: https://......"
                  />
                </div>
                <div className="font-4">
                  <label className="">Ngày thành lập</label>
                  <input
                    type="date"
                    required
                    {...register("establish_at")}
                    className="w-full h-10 outline-none border-2 rounded px-2"
                  />
                </div>
                <DialogActions>
                  <button
                    onClick={changeStatusOpenAddBranch}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
                  >
                    <span className="font-7">Hủy</span>
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
                  >
                    <span className="font-3">Thêm</span>
                  </button>
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
              <th className="">Mã chi nhánh</th>
              <th className="">Tên</th>
              <th className="">Email</th>
              <th className="">Đường dây nóng</th>
              <th className="">Link bản đồ</th>
              <th className="">Ngày thành lập</th>
              <th className="">Mô tả</th>
              <th className="">Địa chỉ</th>
              <th className="">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item: any, index: number) => {
                return (
                  <EditRowBranches
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
export interface IDetailsBranch {
  name: string;
  email: string;
  hotline: string;
  src_map: string;
  description: string;
  address: string;
  id: number;
  established_at: string;
}
const EditRowBranches: React.FC<{
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

  const [details, setDetails] = useState<IDetailsBranch>({
    id: item.id,
    name: item.name,
    email: item.email,
    address: item.address,
    description: item.description,
    hotline: item.hotline,
    src_map: item.src_map,
    established_at: item.establish_at,
  });
  const [detailsBackup, setDetailsBackup] = useState<IDetailsBranch>({
    id: item.id,
    name: item.name,
    email: item.email,
    address: item.address,
    description: item.description,
    hotline: item.hotline,
    src_map: item.src_map,
    established_at: item.establish_at,
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
    setIsEdit(!isEdit);
    await EditBranchModuleController.updateBranches(details, token, {
      toast: toast,
      options: toastConfigs,
    });
    setDetailsBackup(details);
  };
  const handleCancelEdit = () => {
    setDetails(detailsBackup);
    setIsEdit(!isEdit);
  };
  const handleDelete = async () => {
    await EditBranchModuleController.deleteBranches(details.id, token, {
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
      <td className={`${isEdit ? "text-white bg-color1" : ""}`}>
        <input
          className={`${isEdit ? "text-white bg-color1" : ""}`}
          type="text"
          value={details.email}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, email: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? "text-white bg-color1" : ""}`}>
        <input
          type="text"
          className={`${isEdit ? "text-white bg-color1" : ""}`}
          value={details.hotline}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, hotline: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? "text-white bg-color1" : ""}`}>
        <input
          className={`${isEdit ? "text-white bg-color1" : ""}`}
          type="text"
          value={details.src_map}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, src_map: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? "text-white bg-color1" : ""}`}>
        {isEdit ? (
          <input
            type="date"
            className={`${isEdit ? "text-white bg-color1" : ""}`}
            onChange={(e) => {
              setDetails({ ...details, established_at: e.target.value });
            }}
          />
        ) : (
          `${details.established_at}`
        )}
      </td>
      <td className={`${isEdit ? "text-white bg-color1" : ""}`}>
        <input
          className={`${isEdit ? "text-white bg-color1" : ""}`}
          type="text"
          value={details.description}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, description: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? "text-white bg-color1" : ""}`}>
        <input
          className={`${isEdit ? "text-white bg-color1" : ""}`}
          type="text"
          value={details.address}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, address: e.target.value });
          }}
        />
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
                  <span className="font-7">
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
                type="button"
                onClick={changeDialogDelete}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
              >
                <span className="font-3">Xóa</span>
              </button>

              <Dialog
                open={openDialogDelete}
                onClose={changeDialogDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <span className="font-3">
                    {"Bạn có chắc chắn muốn xóa chi nhánh này không?"}
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
export default EditBranches;
