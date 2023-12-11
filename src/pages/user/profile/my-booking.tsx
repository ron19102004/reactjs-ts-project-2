/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BookingUserModuleController } from "../booking/booking.controller";
import { ValidatorCustomModule } from "../../../helpers/validator";
import { icons } from "../../admin/my-booking/all-my";
import { Divider } from "@material-ui/core";

interface IMyBookingUser {
  user_id: number;
  token: string;
}
const MyBookingUser: React.FC<IMyBookingUser> = ({ user_id, token }) => {
  const [listBookingAcceptYet, setListBookingAcceptYet] = useState<any[]>([]);
  const [listBookingAccepted, setListBookingAccepted] = useState<any[]>([]);
  const [listBookingRefused, setListBookingRefused] = useState<any[]>([]);
  const [listBookingFinished, setListBookingFinished] = useState<any[]>([]);
  const [listBookingOverDate, setListBookingOverDate] = useState<any[]>([]);
  const init = async () => {
    const listAllBooking: any[] =
      await BookingUserModuleController.getAllMyBookings(user_id, token);
    const listBookingAcceptYet$: any[] = [];
    const listBookingAccepted$: any[] = [];
    const listBookingRefused$: any[] = [];
    const listBookingFinished$: any[] = [];
    const listBookingOverDate$: any[] = [];
    const dateNow = ValidatorCustomModule.getDate();
    listAllBooking.forEach((item) => {
      const overDate =
        ValidatorCustomModule.compareDate(
          item.appointment_date,
          dateNow.split("-").reverse().join("-")
        ) >= 0
          ? false
          : true;
      if (
        overDate === true &&
        (item.finished === false ||
          item.accepted === false ||
          item.comfirm === false)
      ) {
        listBookingOverDate$.push(item);
      } else {
        if (
          item.confirm === false ||
          (item.rejected === false && item.accepted === false)
        )
          listBookingAcceptYet$.push(item);
        else if (item.accepted === false && item.rejected === true)
          listBookingRefused$.push(item);
        else if (item.accepted === true && item.finished === false)
          listBookingAccepted$.push(item);
        else if (item.finished === true) listBookingFinished$.push(item);
      }
    });
    setListBookingAcceptYet(listBookingAcceptYet$);
    setListBookingAccepted(listBookingAccepted$);
    setListBookingRefused(listBookingRefused$);
    setListBookingFinished(listBookingFinished$);
    setListBookingOverDate(listBookingOverDate$);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="space-y-3">
      <section className="space-y-3 flex items-center flex-col">
        <h1 className="font-3 text-3xl text-color2 text-center">
          Lịch hẹn của tôi
        </h1>
        <Divider
          style={{
            backgroundColor: "#53599A",
            height: "2px",
          }}
          className=" w-full md:w-[50%]"
        />
      </section>
      <section className="space-y-3">
        <h2 className="font-3 text-xl text-color2 text-center ">
          <p> Lịch hẹn chưa được chấp nhận</p>
          <p>Số lượng: {listBookingAcceptYet.length}</p>
        </h2>
        <ul className="grid gap-3 grid-cols-1 md:grid-cols-2 overflow-y-auto max-h-screen p-3 rounded-xl">
          {listBookingAcceptYet.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className="p-3 bg-color7 rounded-xl shadow-lg hover:shadow-xl"
              >
                <CardBookingUser data={item} token={token} user_id={user_id} />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="font-3 text-xl text-color2 text-center">
          <p> Lịch hẹn bị từ chối</p>
          <p>Số lượng: {listBookingRefused.length}</p>{" "}
        </h2>
        <ul className="grid gap-3 grid-cols-1 md:grid-cols-2 overflow-y-auto max-h-screen p-3 rounded-xl">
          {listBookingRefused.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className="p-3 bg-color7 rounded-xl shadow-lg hover:shadow-xl"
              >
                <CardBookingUser data={item} token={token} user_id={user_id} />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="font-3 text-xl text-color2 text-center">
          <p> Lịch hẹn đã được chấp nhận</p>
          <p>Số lượng: {listBookingAccepted.length}</p>{" "}
        </h2>
        <ul className="grid gap-3 grid-cols-1 md:grid-cols-2 overflow-y-auto max-h-screen p-3 rounded-xl">
          {listBookingAccepted.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className="p-3 bg-color7 rounded-xl shadow-lg hover:shadow-xl"
              >
                <CardBookingUser data={item} token={token} user_id={user_id} />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="font-3 text-xl text-color2 text-center">
          <p> Lịch hẹn đã hoàn thành</p>
          <p>Số lượng: {listBookingFinished.length}</p>{" "}
        </h2>
        <ul className="grid gap-3 grid-cols-1 md:grid-cols-2 overflow-y-auto max-h-screen p-3 rounded-xl">
          {listBookingFinished.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className="p-3 bg-color7 rounded-xl shadow-lg hover:shadow-xl"
              >
                <CardBookingUser data={item} token={token} user_id={user_id} />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="font-3 text-xl text-color2 text-center">
          <p> Lịch hẹn bị quá hạn</p>
          <p>Số lượng: {listBookingOverDate.length}</p>{" "}
        </h2>
        <ul className="grid gap-3 grid-cols-1 md:grid-cols-2 overflow-y-auto max-h-screen p-3 rounded-xl">
          {listBookingOverDate.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className="p-3 bg-color7 rounded-xl shadow-lg hover:shadow-xl"
              >
                <CardBookingUser data={item} token={token} user_id={user_id} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
const icons$ = icons;
interface ICardBookingUserProps {
  data: any;
  user_id: number;
  token: string;
}
const CardBookingUser: React.FC<ICardBookingUserProps> = ({ data }) => {
  const [statusBooking, setStatusBooking] = useState<{
    rejected: boolean;
    confirmed: boolean;
    accepted: boolean;
    finished: boolean;
    overDate: boolean;
  }>({
    accepted: false,
    confirmed: false,
    finished: false,
    overDate: false,
    rejected: false,
  });
  const init = async () => {
    const dateNow = ValidatorCustomModule.getDate();
    let overDate = false;
    if (
      (data.finished === false && data.accepted === true) ||
      (data.rejected === false && data.accepted === false)
    ) {
      overDate =
        ValidatorCustomModule.compareDate(
          data.appointment_date,
          dateNow.split("-").reverse().join("-")
        ) >= 0
          ? false
          : true;
    }
    setStatusBooking({
      accepted: data.accepted,
      rejected: data.rejected,
      finished: data.finished,
      confirmed: data.confirm,
      overDate: overDate,
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3">
      <section>
        <h1 className="font-3">Thông tin hồ sơ</h1>
        <ul className="font-2">
          <li>
            <span>Mã hồ sơ: </span>
            <span>{data.id}</span>
          </li>
          <li>
            <span>Tên dịch vụ: </span>
            <span>{data.uService?.service?.name}</span>
          </li>
          <li>
            <span>Giá dịch vụ: </span>
            <span>{data.uService?.service?.price}kVNĐ</span>
          </li>
          <li>
            <span>Ngày khởi tạo: </span>
            <span>{data.timeInit}</span>
          </li>
          <li>
            <span>Ngày hẹn: </span>
            <span>{data.appointment_date}</span>
          </li>
          <li>
            <span>Ghi chú: </span>
            <textarea
              className="w-full h-20 p-1 outline-none bg-slate-200 rounded-xl"
              disabled
              value={data.note.length > 0 ? data.note : "Không có"}
            />
          </li>
        </ul>
      </section>
      <section>
        <h1 className="font-3">Thông tin bác sĩ</h1>
        <ul className="font-2">
          <li>
            <span>Mã thông tin: </span>
            <span>{data?.admin?.id}</span>
          </li>
          <li>
            <span>Họ và tên: </span>
            <span>
              {data?.admin?.firstName} {data?.admin?.lastName}
            </span>
          </li>
          <li>
            <span>Chức vụ: </span>
            <span>{data?.admin?.position}</span>
          </li>
          <li>
            <span>Email: </span>
            <span>{data?.admin?.email}</span>
          </li>
          <li>
            <span>Số điện thoại: </span>
            <span>{data?.admin?.phoneNumber}</span>
          </li>
        </ul>
      </section>
      <section>
        <h1 className="font-3">Trạng thái hồ sơ</h1>
        <ul className="font-2">
          <li className="flex space-x-1 items-center">
            <span>
              {statusBooking.confirmed ? icons$.checked : icons$.refused}
            </span>
            <span>Xác thực</span>
          </li>
          <li className="flex space-x-1 items-center">
            <span>
              {statusBooking.rejected ? icons$.checked : icons$.refused}
            </span>
            <span>Từ chối</span>
          </li>
          <li className="flex space-x-1 items-center">
            <span>
              {statusBooking.accepted ? icons$.checked : icons$.refused}
            </span>
            <span>Chấp nhận</span>
          </li>
          <li className="flex space-x-1 items-center">
            <span>
              {statusBooking.finished ? icons$.checked : icons$.refused}
            </span>
            <span>Hoàn thành</span>
          </li>
          <li className="flex space-x-1 items-center">
            <span>
              {statusBooking.overDate ? icons$.checked : icons$.refused}
            </span>
            <span>Quá thời hạn</span>
          </li>
        </ul>
      </section>
    </section>
  );
};
export default MyBookingUser;
