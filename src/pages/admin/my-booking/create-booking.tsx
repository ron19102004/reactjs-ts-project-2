/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { EditUserServiceModuleController } from "../edit-info/edit-info.controller";
import { icons } from "./all-my";
import { UserModuleController } from "./user.controller";
import { ToastOptions, toast } from "react-toastify";
import { MyBookingAdminModuleController } from "./my-booking.controller";
const icons$ = icons;
export enum EMethodsCheckUser {
  uid = "uid",
  phone = "phone",
  email = "email",
}
interface ICreateBookingProps {
  admin_id: number;
  token: string;
  initAllMyBooking: () => Promise<void>;
}
const CreateBooking: React.FC<ICreateBookingProps> = ({
  token,
  admin_id,
  initAllMyBooking,
}) => {
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
  const [open, setOpen] = useState(false);
  const [listUService, setListUService] = useState<any[]>([]);
  const [user, setUser] = useState<{
    details: any;
    checked: boolean;
  }>({
    details: {},
    checked: false,
  });
  const [note, setNote] = useState<string>("");
  const [valueCheckUser, setValueCheckUser] = useState<string>("");
  const [methodCheckUser, setMethodCheckUser] = useState<EMethodsCheckUser>(
    EMethodsCheckUser.uid
  );
  const [idUServiceSelectUser, setIdUServiceSelectUser] = useState<number>(0);
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const changeValueCheckUser = (e: any) => {
    setValueCheckUser(e.target.value);
  };
  const init = async () => {
    const listUService$ =
      await EditUserServiceModuleController.getAdminAndServiceForAd(
        admin_id,
        token
      );
    setListUService(listUService$);
  };
  useEffect(() => {
    init();
  }, []);
  const handleChangeStatusOpen = () => {
    setOpen(!open);
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
  const handleCreate = async () => {
    handleChangeStatusOpen();
    if (Object.keys(user.details).length === 0) {
      toast.warning("Vui lòng thêm thông tin khách hàng", toastConfigs);
      return;
    }
    if (!user.checked) {
      toast.warning(
        "Vui lòng kiểm tra thông tin khách hàng trước khi thêm mới",
        toastConfigs
      );
      return;
    }
    if (idUServiceSelectUser === 0) {
      toast.warning("Vui lòng chọn dịch vụ", toastConfigs);
      return;
    }
    if (appointmentDate.length === 0) {
      toast.warning("Vui lòng chọn ngày hẹn", toastConfigs);
      return;
    }
    const app_date = appointmentDate.split("-").reverse().join("-");
    const payload = {
      admin_id: admin_id,
      user_id: user.details.id,
      note: note,
      user_service_id: idUServiceSelectUser,
      appointment_date: app_date,
    };
    await MyBookingAdminModuleController.addBooking(
      payload,
      { toast: toast, options: toastConfigs },
      token
    );
    initAllMyBooking();
    setUser({
      checked: false,
      details: {},
    });
    setIdUServiceSelectUser(0);
    setNote("");
    setMethodCheckUser(EMethodsCheckUser.uid);
    setValueCheckUser("");
  };
  return (
    <div className="">
      <button
        className="bg-color5 text-color2 px-2 py-1 rounded hover:bg-color4 font-3 shadow hover:shadow-md"
        onClick={handleChangeStatusOpen}
      >
        Thêm lịch hẹn
      </button>
      <Dialog
        open={open}
        onClose={handleChangeStatusOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="text-color2">
          <span className="font-3">Thêm lịch hẹn mới</span>
        </DialogTitle>
        <DialogContent className="font-2 space-y-2 text-color2">
          <div className="space-y-2">
            <section className="flex space-x-2 items-center">
              <h1 className="font-3">Thông tin khách hàng</h1>
              <select
                className="h-10 outline-none border-2 rounded p-1"
                onChange={(e: any) => {
                  setMethodCheckUser(e.target.value);
                  setValueCheckUser("");
                }}
              >
                <option value={EMethodsCheckUser.uid}>UID</option>
                <option value={EMethodsCheckUser.email}>Email</option>
                <option value={EMethodsCheckUser.phone}>Số điện thoại</option>
              </select>
            </section>
            <section className="flex items-center space-x-2">
              {methodCheckUser === EMethodsCheckUser.uid && (
                <input
                  type="number"
                  required
                  className="outline-none border-2 rounded h-10 w-full px-2"
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
                  className="outline-none border-2 rounded h-10 w-full px-2"
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
                  className="outline-none border-2 rounded h-10 w-full px-2"
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
                <div>{!user.checked ? icons$.refused : icons$.checked}</div>
              </button>
            </section>

            {Object.keys(user.details).length > 0 && (
              <section className="">
                <h1 className="font-3">Thông tin cơ bản khách hàng</h1>
                <div className="p-2 border-2 h-28 overflow-y-auto  rounded">
                  <p>UID: {user.details.id}id</p>
                  <p>Họ đệm: {user.details.firstName}</p>
                  <p>Tên: {user.details.lastName}</p>
                  <p>SĐT: {user.details.phoneNumber}</p>
                  <p>Email: {user.details.email}</p>
                  <p>Tuổi: {user.details.age}</p>
                  <p>Địa chỉ: {user.details.address}</p>
                  <p>Giới tính: {user.details.sex === "male" ? "Nam" : "Nữ"}</p>
                </div>
              </section>
            )}
          </div>
          <section className="space-y-2">
            <section className="flex space-x-2 items-center">
              <h1 className="font-3">Dịch vụ</h1>
            </section>
            <select
              className="h-10 outline-none border-2 rounded p-1 w-full"
              onChange={(e) => {
                setIdUServiceSelectUser(parseInt(e.target.value));
              }}
            >
              <option value="0">Chọn dịch vụ</option>
              {listUService &&
                listUService.map((item: any, index: number) => (
                  <option
                    value={item.id}
                    key={index}
                    className="h-10 outline-none border-2 rounded p-1"
                  >
                    {item.service.id}-{item.service.name}-{item.admin.firstName}{" "}
                    {item.admin.lastName}-{item.service.price}kVNĐ
                  </option>
                ))}
            </select>
          </section>
          <section className={``}>
            <h1 className="font-3">Ngày hẹn</h1>
            <input
              type="date"
              required
              className={`h-10 font-2 w-full outline-none border-2 p-2 rounded`}
              onChange={(e) => {
                setAppointmentDate(e.target.value);
              }}
            />
          </section>
          <section className={``}>
            <h1 className="font-3">Ghi chú</h1>
            <textarea
              className={`h-32 font-2 w-full outline-none border-2 p-2 rounded`}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
          </section>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleChangeStatusOpen}
            color="secondary"
            variant="contained"
          >
            Hủy
          </Button>
          <Button onClick={handleCreate} color="primary" variant="contained">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CreateBooking;
