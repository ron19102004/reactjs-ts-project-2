/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  EditDepartmentModuleController,
  EditServiceModuleController,
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
interface IEditServiceProps {
  admin_id: number;
  token: string;
}
const EditService: React.FC<IEditServiceProps> = ({ admin_id, token }) => {
  const [list, setList] = useState<any[]>([]);
  const [listDepartment, setListDepartment] = useState<any[]>([]);
  const [openAddService, setOpenAddService] = useState<boolean>(false);
  const changeStatusOpenAddService = async () => {
    if (!openAddService) {
      const listDepartment =
        await EditDepartmentModuleController.getDepartment();
      setListDepartment(listDepartment);
    }
    setOpenAddService(!openAddService);
  };
  const { handleSubmit, register, reset } = useForm();
  const init = async () => {
    const response = await EditServiceModuleController.getService();

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
  const createService = async (e: any) => {
    const payload = {
      name: e.name,
      description: e.description,
      price: parseInt(e.price),
      department_id: parseInt(e.department_id),
    };
    await EditServiceModuleController.addService(
      token,
      { toast: toast, options: toastConfigs },
      payload
    );
    reset();
    changeStatusOpenAddService();
    const response = await EditServiceModuleController.getService();
    setList(response);
  };
  return (
    <article className="font-2 space-y-3">
      <section className="space-y-3 md:space-y-0 md:flex md:space-x-2 md:items-center">
        <h1 className="font-3 xl:text-2xl text-lg text-color2">
          Thông tin các dịch vụ
        </h1>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={changeStatusOpenAddService}
          >
            Thêm dịch vụ mới
          </Button>
          <Dialog
            open={openAddService}
            onClose={changeStatusOpenAddService}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Thêm dịch vụ mới</DialogTitle>
            <form
              onSubmit={handleSubmit(createService)}
              className="text-color2"
            >
              <DialogContent>
                <div className="font-2">
                  <label>Khoa</label>
                  <select
                    required
                    {...register("department_id")}
                    className="w-full h-10 outline-none border-2 rounded px-2"
                  >
                    {listDepartment &&
                      listDepartment.map((x: any, index: number) => {
                        return (
                          <option key={index} value={x.id}>
                            {x.name}-{x.id}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="font-2">
                  <label>Tên dịch vụ</label>
                  <input
                    type="text"
                    required
                    {...register("name")}
                    className="w-full h-10 outline-none border-2 rounded px-2"
                  />
                </div>
                <div className="font-2">
                  <label>Giá (kVNĐ)</label>
                  <input
                    type="number"
                    required
                    {...register("price")}
                    className="w-full h-10 outline-none border-2 rounded px-2"
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
                <DialogActions>
                  <Button
                    onClick={changeStatusOpenAddService}
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
      <section className="overflow-x-auto w-full">
        <table className="branches-table min-w-full">
          <thead className="bg-color2 text-color7">
            <tr className="font-3">
              <th className="">Mã số dịch vụ</th>
              <th className="">Mã số khoa</th>
              <th className="">Tên dịch vụ</th>
              <th className="">Giá dịch vụ (kVNĐ)</th>
              <th className="w-[50%]">Mô tả</th>
              <th className="">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item: any, index: number) => {
                return (
                  <EditRowService
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
export interface IDetailsService {
  name: string;
  description: string;
  id: number;
  department_id: number;
  price: number;
}
const EditRowService: React.FC<{
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

  const [details, setDetails] = useState<IDetailsService>({
    department_id: 0,
    description: "",
    id: 0,
    name: "",
    price: 0,
  });
  const [detailsBackup, setDetailsBackup] = useState<IDetailsService>({
    department_id: 0,
    description: "",
    id: 0,
    name: "",
    price: 0,
  });

  const init = () => {
    setDetails({
      department_id: item.department.id,
      description: item.description,
      id: item.id,
      name: item.name,
      price: item.price,
    });
  };
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const changeStatusIsEdit = () => {
    if (!isEdit) {
      setDetailsBackup(details);
    }
    setIsEdit(!isEdit);
  };
  const handleSave = async () => {
    await EditServiceModuleController.updateService(details, token, {
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
    await EditServiceModuleController.deleteService(details.id, token, {
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
        {details.department_id}
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <input
          className={`${isEdit ? " bg-color1 text-white" : ""} w-full`}
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
          className={`${isEdit ? " bg-color1 text-white" : ""} w-full`}
          type="number"
          value={details.price}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, price: parseInt(e.target.value) });
          }}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <textarea
          cols={30}
          rows={5}
          className={`${isEdit ? " bg-color1 text-white" : ""} w-full`}
          value={details.description}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, description: e.target.value });
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
                  {"Bạn có chắc chắn muốn xóa dịch vụ này không?"}
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
export default EditService;
