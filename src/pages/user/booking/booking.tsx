/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useState } from "react";
import { ToastOptions, toast } from "react-toastify";
import { BookingUserModuleController } from "./booking.controller";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
interface IBookingProps {
  user_id: number;
  token: string;
  admin_id: number;
  uService: {
    id: number;
    service: any;
  }[];
}
const Booking: React.FC<IBookingProps> = ({
  uService,
  user_id,
  token,
  admin_id,
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
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
        onClick={changeStatusOpen}
      >
        <span className="font-3">Đặt Hẹn</span>
      </button>

      <Dialog
        open={open}
        onClose={changeStatusOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span className="font-4 text-color2">Đặt hẹn</span>
        </DialogTitle>
        <DialogContent>
          <section className="space-y-2 font-4 text-color2">
            <section className="flex space-x-2 items-center">
              <h1 className="">Dịch vụ</h1>
            </section>
            <select
              className="h-10 outline-none rounded p-1 w-full"
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
                    className="h-10 outline-none  rounded p-1"
                  >
                    {item?.service?.id}-{item?.service?.name}-
                    {item?.service?.firstName} {item?.service?.lastName}
                    {ValidatorCustomModule.convertCurrencyStringToNumber(`${item?.service?.price}.000kVNĐ`)}
                  </option>
                ))}
            </select>
          </section>
          <section className={`font-4 text-color2`}>
            <h1 className="">Ngày hẹn</h1>
            <input
              type="date"
              required
              className={`h-10 font-4 w-full outline-none  p-2 rounded`}
              onChange={(e) => {
                setAppointmentDate(e.target.value);
              }}
            />
          </section>
          <section className={`font-4 text-color2`}>
            <h1 className="">Ghi chú</h1>
            <div className="overflow-auto font-sans">
              <CKEditor
                editor={ClassicEditor}
                data={note}
                onChange={(e, editor) => {
                  setNote(editor.getData());
                }}
              />
            </div>
          </section>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            onClick={changeStatusOpen}
          >
            Hủy
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
            onClick={booking}
          >
            Đặt lịch
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Booking;
