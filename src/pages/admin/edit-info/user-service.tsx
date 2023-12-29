/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  EditServiceModuleController,
  EditUserServiceModuleController,
} from "./edit-info.controller";
import editIcon from "../../../assets/edit.png";
import checkedIcon from "../../../assets/checked.png";
import closeIcon from "../../../assets/reject.png";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { ToastOptions, toast } from "react-toastify";
import { EMethodsCheckUser } from "../my-booking/create-booking";
import { UserModuleController } from "../my-booking/user.controller";
import { Role } from "../../../redux/reducers/auth.reducer";
import { ValidatorCustomModule } from "../../../helpers/validator";
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
interface IEditUserServiceProps {
  admin_id: number;
  token: string;
}
const EditUserService: React.FC<IEditUserServiceProps> = ({
  admin_id,
  token,
}) => {
  const [list, setList] = useState<any[]>([]);
  const [listService, setListService] = useState<any[]>([]);
  const [openAddUService, setOpenAddUService] = useState<boolean>(false);
  const changeStatusOpenAddUService = async () => {
    if (!openAddUService) {
      const re = await EditServiceModuleController.getService();
      setListService(re);
    }
    setOpenAddUService(!openAddUService);
  };
  const [user, setUser] = useState<{
    details: any;
    checked: boolean;
  }>({
    details: {},
    checked: false,
  });
  const [methodCheckUser, setMethodCheckUser] = useState<EMethodsCheckUser>(
    EMethodsCheckUser.uid
  );
  const [idServiceSelectUser, setIdServiceSelectUser] = useState<number>(0);
  const [valueCheckUser, setValueCheckUser] = useState<string>("");
  const init = async () => {
    setUser({
      checked: false,
      details: {},
    });
    const response = await EditUserServiceModuleController.getAdminAndService();
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
  const changeValueCheckUser = (e: any) => {
    setValueCheckUser(e.target.value);
  };
  const createService = async () => {
    await EditUserServiceModuleController.addUserService(
      {
        user_id: user.details.id,
        service_id: idServiceSelectUser,
      },
      token,
      { toast: toast, options: toastConfigs }
    );
    changeStatusOpenAddUService();
    await init();
  };
  const handleCheckUser = async () => {
    setUser({
      checked: false,
      details: {},
    });
    if (valueCheckUser.length === 0) {
      toast.warning("Vui lòng nhập giá trị kiểm tra", toastConfigs);
      return;
    }
    const user$ = await UserModuleController.getByCondition(
      valueCheckUser,
      token,
      methodCheckUser
    );
    if (user$.role === Role.user) {
      toast.error(
        "Tài khoản user. Không có tác vụ trong này, vui lòng kiểm tra lại",
        toastConfigs
      );
      return;
    }
    if (!user$.survice) {
      toast.error(
        "Không tìm thấy thông tin khách hàng.Vui lòng kiểm tra lại",
        toastConfigs
      );
      return;
    }
    setUser({
      checked: true,
      details: user$.data,
    });
    toast.success("Kiểm tra thông tin thành công", toastConfigs);
  };
  return (
    <article className="font-2 space-y-3">
      <section className="space-y-3 md:space-y-0 md:flex md:space-x-2 md:items-center">
        <h1 className="font-7 xl:text-2xl text-lg text-color2 pointer-events-none ">
          Thông tin dịch vụ & nhân viên
        </h1>
        <div>
          <button
            type="button"
            onClick={changeStatusOpenAddUService}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <span className="font-3">Thêm liên kết</span>
          </button>
          <Dialog
            open={openAddUService}
            onClose={changeStatusOpenAddUService}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              <span className="font-3 text-color2">Thêm liên kết</span>
            </DialogTitle>

            <DialogContent className="font-4">
              <div className="space-y-2">
                <section className="flex space-x-2 items-center">
                  <h1 className="font-7">Thông tin khách hàng</h1>
                  <select
                    className="h-10 outline-none  rounded p-1"
                    onChange={(e: any) => {
                      setMethodCheckUser(e.target.value);
                      setValueCheckUser("");
                    }}
                  >
                    <option value={EMethodsCheckUser.uid}>UID</option>
                    <option value={EMethodsCheckUser.email}>Email</option>
                    <option value={EMethodsCheckUser.phone}>
                      Số điện thoại
                    </option>
                  </select>
                </section>
                <section className="flex items-center space-x-2">
                  {methodCheckUser === EMethodsCheckUser.uid && (
                    <input
                      type="number"
                      required
                      className="outline-none rounded h-10 w-full px-2"
                      placeholder="Ví dụ: 4id nhập 4"
                      onChange={(e) => {
                        changeValueCheckUser(e);
                      }}
                    />
                  )}
                  {methodCheckUser === EMethodsCheckUser.phone && (
                    <input
                      type="tel"
                      required
                      className="outline-none rounded h-10 w-full px-2"
                      placeholder="Ví dụ: 0392477615"
                      onChange={(e) => {
                        changeValueCheckUser(e);
                      }}
                    />
                  )}
                  {methodCheckUser === EMethodsCheckUser.email && (
                    <input
                      type="email"
                      required
                      className="outline-none rounded h-10 w-full px-2"
                      placeholder="VD: abc@gmail.com"
                      onChange={(e) => {
                        changeValueCheckUser(e);
                      }}
                    />
                  )}
                  <button
                    className="h-10 w-[60%] md:w-[30%] justify-center flex items-center bg-color5 px-1 hover:bg-color4 text-xs md:text-base rounded shadow hover:shadow-md space-x-1"
                    color="primary"
                    onClick={handleCheckUser}
                  >
                    <div>
                      <span className="">Kiểm tra</span>
                    </div>
                    <div>{!user.checked ? icons.close : icons.check}</div>
                  </button>
                </section>

                {Object.keys(user.details).length > 0 && (
                  <section className="">
                    <h1 className="font-7">Thông tin cơ bản khách hàng</h1>
                    <div className="p-2  h-28 overflow-y-auto rounded">
                      <p>UID: {user.details.id}id</p>
                      <p>Họ đệm: {user.details.firstName}</p>
                      <p>Tên: {user.details.lastName}</p>
                      <p>SĐT: {user.details.phoneNumber}</p>
                      <p>Email: {user.details.email}</p>
                      <p>Tuổi: {user.details.age}</p>
                      <p>Địa chỉ: {user.details.address}</p>
                      <p>
                        Giới tính: {user.details.sex === "male" ? "Nam" : "Nữ"}
                      </p>
                    </div>
                  </section>
                )}
              </div>
              <section className="space-y-2">
                <section className="flex space-x-2 items-center">
                  <h1 className="font-3">Dịch vụ</h1>
                </section>
                <select
                  className="h-10 outline-none  rounded p-1 w-full"
                  onChange={(e) => {
                    setIdServiceSelectUser(parseInt(e.target.value));
                  }}
                >
                  <option value="0">Chọn dịch vụ</option>
                  {listService &&
                    listService.map((item: any, index: number) => (
                      <option
                        value={item.id}
                        key={index}
                        className="h-10 outline-none rounded p-1"
                      >
                        {item.id}-{item.name}-{item.department.name}-
                        {ValidatorCustomModule.convertCurrencyStringToNumber(`${item.price}.000kVNĐ`)}
                      </option>
                    ))}
                </select>
              </section>
              <DialogActions>
                <button
                  onClick={changeStatusOpenAddUService}
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
                >
                  <span className="font-7">Hủy</span>
                </button>

                <button
                  onClick={createService}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
                >
                  <span className="font-7">Đồng ý</span>
                </button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </section>
      <section className="overflow-x-auto w-full">
        <table className="branches-table min-w-full">
          <thead className="bg-color2 text-color7">
            <tr className="font-7">
              <th className="">Mã số liên kết</th>
              <th className="">Mã số dịch vụ</th>
              <th className="">Mã số nhân viên (AID) </th>
              <th className="">Tên nhân viên</th>
              <th className="">Tên dịch vụ</th>
              <th className="">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item: any, index: number) => {
                return (
                  <EditRowUService
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
export interface IDetailsUService {}
const EditRowUService: React.FC<{
  item: any;
  admin_id: number;
  token: string;
  handleDeleteItem: (id: number) => void;
}> = ({ item, token, handleDeleteItem }) => {
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const changeDialogDelete = () => {
    setOpenDialogDelete(!openDialogDelete);
  };
  const init = () => {};
  const handleDelete = async () => {
    await EditUserServiceModuleController.removeAdminAndService(
      token,
      { toast: toast, options: toastConfigs },
      item.id
    );
    handleDeleteItem(item.id);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <tr>
      <td className={``}>{item.id}</td>
      <td className={``}>{item.service.id}</td>
      <td className={``}>{item.admin.id}</td>
      <td className={``}>
        {item.admin.firstName} {item.admin.lastName}
      </td>
      <td className={``}>{item.service.name}</td>
      <td className="space-y-1 p-1">
        <div>
          <button
            onClick={changeDialogDelete}
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
          >
            <span className="font-7">Hủy</span>
          </button>
          <Dialog
            open={openDialogDelete}
            onClose={changeDialogDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <span className="font-7">
                {"Bạn có chắc chắn muốn xóa dịch vụ này không?"}
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
      </td>
    </tr>
  );
};
export default EditUserService;
