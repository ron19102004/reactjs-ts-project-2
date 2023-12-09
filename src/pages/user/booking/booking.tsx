/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useState } from "react";
import { ToastOptions, toast } from "react-toastify";
import { BookingUserModuleController } from "./booking.controller";
import { useNavigate } from "react-router-dom";
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
interface IBookingProps {
  user_id: number;
  token: string;
  admin_id: number;
  uService: {
    id: number;
    service: any;
  }[];
  openInfo: boolean;
}
const Booking: React.FC<IBookingProps> = ({
  uService,
  user_id,
  token,
  admin_id,
  openInfo,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const changeStatusOpen = () => {
    if (!open && !user_id) {
      navigate("/auth/login");
      return;
    }
    setOpen(!open);
  };
  const [idUServiceSelect, setIdUServiceSelect] = useState<number>(0);
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const booking = async () => {
    if (idUServiceSelect === 0) {
      toast.warning("Vui lòng chọn dịch vụ", toastConfigs);
      return;
    }
    if (appointmentDate.length === 0) {
      toast.warning("Vui lòng chọn ngày hẹn", toastConfigs);
      return;
    }
    changeStatusOpen();
    const app_date = appointmentDate.split("-").reverse().join("-");
    await BookingUserModuleController.booking(
      {
        user_service_id: idUServiceSelect,
        admin_id: admin_id,
        user_id: user_id,
        note: note,
        appointment_date: app_date,
      },
      { toast: toast, options: toastConfigs },
      token
    );
    setNote("");
    setIdUServiceSelect(0);
    setAppointmentDate("");
  };
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={changeStatusOpen}
        className={`${openInfo ? "w-full" : ""}`}
      >
        <span className="font-3">Đặt Hẹn</span>
      </Button>
      <Dialog
        open={open}
        onClose={changeStatusOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span className="font-3 text-color2">Đặt hẹn</span>
        </DialogTitle>
        <DialogContent>
          <section className="space-y-2 font-2 text-color2">
            <section className="flex space-x-2 items-center">
              <h1 className="font-3">Dịch vụ</h1>
            </section>
            <select
              className="h-10 outline-none border-2 rounded p-1 w-full"
              onChange={(e) => {
                setIdUServiceSelect(parseInt(e.target.value));
              }}
            >
              <option value="0">Chọn dịch vụ</option>
              {uService &&
                uService.map((item: any, index: number) => (
                  <option
                    value={item.id}
                    key={index}
                    className="h-10 outline-none border-2 rounded p-1"
                  >
                    {item?.service?.id}-{item?.service?.name}-
                    {item?.service?.firstName} {item?.service?.lastName}-
                    {item?.service?.price}kVNĐ
                  </option>
                ))}
            </select>
          </section>
          <section className={`font-2 text-color2`}>
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
          <section className={`font-2 text-color2`}>
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
            onClick={changeStatusOpen}
            color="secondary"
            variant="contained"
          >
            Hủy
          </Button>
          <Button onClick={booking} color="primary" variant="contained">
            Đặt lịch
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Booking;
