/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BookingUserModuleController } from "../booking/booking.controller";
import { ValidatorCustomModule } from "../../../helpers/validator";
import { NavLink } from "react-router-dom";

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
    <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      <div className="w-full flex flex-col ">
        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
          <h4 className="text-xl text-gray-900 font-bold">
            Thông tin lịch hẹn
          </h4>
          <ul className="mt-2 text-gray-700">
            <li className="items-center border-y py-2">
              <h1 className="font-6 text-lg underline">
                Các lịch hẹn chưa chấp nhận
              </h1>
              <ul className="grid gap-3 max-h-screen overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listBookingAcceptYet.map((data: any, index: number) => {
                  return <CardBookingUser data={data} key={index} />;
                })}
              </ul>
            </li>
            <li className="items-center border-y py-2">
              <h1 className="font-6 text-lg underline">
                Các lịch hẹn đang diễn ra
              </h1>
              <ul className="grid gap-3 max-h-screen overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listBookingAccepted.map((data: any, index: number) => {
                  return <CardBookingUser data={data} key={index} />;
                })}
              </ul>
            </li>
            <li className="items-center border-y py-2">
              <h1 className="font-6 text-lg underline">
                Các lịch hẹn bị từ chối
              </h1>
              <ul className="grid gap-3 max-h-screen overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listBookingRefused.map((data: any, index: number) => {
                  return <CardBookingUser data={data} key={index} />;
                })}
              </ul>
            </li>
            <li className="items-center border-y py-2">
              <h1 className="font-6 text-lg underline">
                Các lịch hẹn đã hoàn thành
              </h1>
              <ul className="grid gap-3 max-h-screen overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listBookingFinished.map((data: any, index: number) => {
                  return <CardBookingUser data={data} key={index} />;
                })}
              </ul>
            </li>
            <li className="items-center border-y py-2">
              <h1 className="font-6 text-lg underline">
                Các lịch hẹn quá thời gian
              </h1>
              <ul className="grid gap-3 max-h-screen overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listBookingOverDate.map((data: any, index: number) => {
                  return <CardBookingUser data={data} key={index} />;
                })}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
interface ICardBookingUserProps {
  data: any;
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
    <li className="max-w-sm p-6 bg-white border border-gray-200 rounded shadow ">
      <h1 className="font-7 flex items-center">
        <span>Trạng thái hồ sơ </span>
      </h1>
      <ul className="font-2 grid  grid-cols-2">
        <li className="flex space-x-1 items-center">
          <span>
            {statusBooking.confirmed ? (
              <div className="w-2 h-2 rounded-full bg-green-500" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-red-500" />
            )}
          </span>
          <span>Xác thực</span>
        </li>
        <li className="flex space-x-1 items-center">
          <span>
            {statusBooking.rejected ? (
              <div className="w-2 h-2 rounded-full bg-green-500" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-red-500" />
            )}
          </span>
          <span>Từ chối</span>
        </li>
        <li className="flex space-x-1 items-center">
          <span>
            {statusBooking.accepted ? (
              <div className="w-2 h-2 rounded-full bg-green-500" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-red-500" />
            )}
          </span>
          <span>Chấp nhận</span>
        </li>
        <li className="flex space-x-1 items-center">
          <span>
            {statusBooking.finished ? (
              <div className="w-2 h-2 rounded-full bg-green-500" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-red-500" />
            )}
          </span>
          <span>Hoàn thành</span>
        </li>
        <li className="flex space-x-1 items-center">
          <span>
            {statusBooking.overDate ? (
              <div className="w-2 h-2 rounded-full bg-green-500" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-red-500" />
            )}
          </span>
          <span>Quá thời hạn</span>
        </li>
      </ul>
      <h1 className="font-7 flex items-center">
        <span>Thông tin hồ sơ </span>
      </h1>
      <ul className="font-4">
        <li>
          <span>Mã hồ sơ: </span>
          <span className="font-3">{data.id}</span>
        </li>
        <li>
          <span>Tên dịch vụ: </span>
          <span className="font-3">{data.uService?.service?.name}</span>
        </li>
        <li>
          <span>Giá dịch vụ: </span>
          <span className="font-3">{ValidatorCustomModule.convertCurrencyStringToNumber(`${data.uService?.service?.price}.000kVNĐ`)}</span>
        </li>
        <li>
          <span>Ngày khởi tạo: </span>
          <span className="font-3">{data.timeInit}</span>
        </li>
        <li>
          <span>Ngày hẹn: </span>
          <span className="font-3">{data.appointment_date}</span>
        </li>
        <li>
          <span>Ghi chú: </span>
          <div
            className="border p-2 font-sans max-h-20 overflow-auto"
            dangerouslySetInnerHTML={{ __html: data.note }}
          ></div>
        </li>
      </ul>
      <h1 className="font-7">
        Thông tin bác sĩ:{" "}
        <NavLink
          to={`/booking/details/${data?.admin?.id}`}
          className={"underline hover:text-blue-700"}
        >
          {data?.admin?.lastName}
        </NavLink>
      </h1>
    </li>
  );
};
export default MyBookingUser;
