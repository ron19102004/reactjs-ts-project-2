/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect, useState } from "react";
import {
  EAction,
  MyBookingAdminModuleController,
} from "./my-booking.controller";
import "./style.scss";
import Button from "@material-ui/core/Button";
import checkedImg from "../../../assets/checked.png";
import refuseImg from "../../../assets/reject.png";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ToastOptions, toast } from "react-toastify";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Tooltip } from "@material-ui/core";
import { ValidatorCustomModule } from "../../../helpers/validator";
import { Divider, HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { Loading } from ".";
import { TelebotModuleController } from "./telebot.controller";
import pencilIcon from "../../../assets/pencil.png";
import saveIcon from "../../../assets/save.png";

const CreateBooking = React.lazy(() => import("./create-booking"));
enum ESearchMethod {
  phone = "phoneNumber",
  email = "email",
  code = "code",
  none = "none",
}
interface IAllBookingAdminProps {
  admin_id: number;
  token: string;
}
const AllBookingAdmin: React.FC<IAllBookingAdminProps> = ({
  admin_id,
  token,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isOpenBoxSearch, setIsOpenBoxSearch] = useState<boolean>(false);
  const [listBookingAcceptYet, setListBookingAcceptYet] = useState<any[]>([]);
  const [listBookingAccepted, setListBookingAccepted] = useState<any[]>([]);
  const [listBookingRefused, setListBookingRefused] = useState<any[]>([]);
  const [listBookingFinished, setListBookingFinished] = useState<any[]>([]);
  const [listBookingConfirmedYet, setListBookingConfirmedYet] = useState<any[]>(
    []
  );

  const [limitAcceptYet, setLimitAcceptYet] = useState<{
    take: number;
    skip: number;
  }>({
    take: 8,
    skip: 0,
  });
  const [limitAccepted, setLimitAccepted] = useState<{
    take: number;
    skip: number;
  }>({
    take: 8,
    skip: 0,
  });
  const [limitRefused, setLimitRefused] = useState<{
    take: number;
    skip: number;
  }>({
    take: 8,
    skip: 0,
  });
  const [limitFinished, setLimitFinished] = useState<{
    take: number;
    skip: number;
  }>({
    take: 8,
    skip: 0,
  });
  const [limitConfirmYet, setLimitConfirmYet] = useState<{
    take: number;
    skip: number;
  }>({
    take: 8,
    skip: 0,
  });
  const [searchMethod, setSearchMethod] = useState<ESearchMethod>(
    ESearchMethod.none
  );
  const [listForSearch, setListForSearch] = useState<any[]>([]);
  const [listResultForSearch, setListResultForSearch] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const init = async () => {
    const listBookingAcceptYet$ =
      await MyBookingAdminModuleController.getAllMyBookingsByCondition(
        admin_id,
        {
          take: limitAcceptYet.take,
          skip: limitAcceptYet.skip,
        },
        {
          accepted: false,
          confirmed: true,
          finished: false,
          rejected: false,
        },
        token
      );
    const listBookingAccepted$ =
      await MyBookingAdminModuleController.getAllMyBookingsByCondition(
        admin_id,
        {
          take: limitAccepted.take,
          skip: limitAccepted.skip,
        },
        {
          accepted: true,
          confirmed: true,
          finished: false,
          rejected: false,
        },
        token
      );
    const listBookingRejected$ =
      await MyBookingAdminModuleController.getAllMyBookingsByCondition(
        admin_id,
        {
          take: limitRefused.take,
          skip: limitRefused.skip,
        },
        {
          accepted: false,
          confirmed: true,
          finished: false,
          rejected: true,
        },
        token
      );
    const listBookingConfirmedYet$ =
      await MyBookingAdminModuleController.getAllMyBookingsByCondition(
        admin_id,
        {
          take: limitConfirmYet.take,
          skip: limitConfirmYet.skip,
        },
        {
          accepted: false,
          confirmed: false,
          finished: false,
          rejected: false,
        },
        token
      );
    const listBookingFinished$ =
      await MyBookingAdminModuleController.getAllMyBookingsByCondition(
        admin_id,
        {
          take: limitFinished.take,
          skip: limitFinished.skip,
        },
        {
          accepted: true,
          confirmed: true,
          finished: true,
          rejected: false,
        },
        token
      );
    setListBookingAcceptYet(listBookingAcceptYet$);
    setListBookingAccepted(listBookingAccepted$);
    setListBookingRefused(listBookingRejected$);
    setListBookingFinished(listBookingFinished$);
    setListBookingConfirmedYet(listBookingConfirmedYet$);
  };
  const handleLoadListConfirmYet = async () => {
    const takeNew: number = limitConfirmYet.take + 5;
    setLimitConfirmYet({ ...limitConfirmYet, take: takeNew });
    const listBookingConfirmedYet$ =
      await MyBookingAdminModuleController.getAllMyBookingsByCondition(
        admin_id,
        {
          take: limitConfirmYet.take,
          skip: limitConfirmYet.skip,
        },
        {
          accepted: false,
          confirmed: false,
          finished: false,
          rejected: false,
        },
        token
      );
    setListBookingConfirmedYet(listBookingConfirmedYet$);
  };
  const handleLoadListFinished = async () => {
    const takeNew: number = limitFinished.take + 5;
    setLimitFinished({ ...limitFinished, take: takeNew });
    const listBookingFinished$ =
      await MyBookingAdminModuleController.getAllMyBookingsByCondition(
        admin_id,
        {
          take: limitFinished.take,
          skip: limitFinished.skip,
        },
        {
          accepted: true,
          confirmed: true,
          finished: true,
          rejected: false,
        },
        token
      );
    setListBookingFinished(listBookingFinished$);
  };
  const handleLoadListRefused = async () => {
    const takeNew: number = limitRefused.take + 5;
    setLimitRefused({ ...limitRefused, take: takeNew });
    const listBookingRejected$ =
      await MyBookingAdminModuleController.getAllMyBookingsByCondition(
        admin_id,
        {
          take: limitRefused.take,
          skip: limitRefused.skip,
        },
        {
          accepted: false,
          confirmed: true,
          finished: false,
          rejected: true,
        },
        token
      );
    setListBookingRefused(listBookingRejected$);
  };
  const handleLoadListAccepted = async () => {
    const takeNew: number = limitAccepted.take + 5;
    setLimitAccepted({ ...limitAccepted, take: takeNew });
    const listBookingAccepted$ =
      await MyBookingAdminModuleController.getAllMyBookingsByCondition(
        admin_id,
        {
          take: limitAccepted.take,
          skip: limitAccepted.skip,
        },
        {
          accepted: true,
          confirmed: true,
          finished: false,
          rejected: false,
        },
        token
      );
    setListBookingAccepted(listBookingAccepted$);
  };
  const handleLoadListAcceptedYet = async () => {
    const takeNew: number = limitAcceptYet.take + 5;
    setLimitAcceptYet({ ...limitAcceptYet, take: takeNew });
    const listBookingAcceptYet$ =
      await MyBookingAdminModuleController.getAllMyBookingsByCondition(
        admin_id,
        {
          take: limitAcceptYet.take,
          skip: limitAcceptYet.skip,
        },
        {
          accepted: false,
          confirmed: true,
          finished: false,
          rejected: false,
        },
        token
      );
    setListBookingAcceptYet(listBookingAcceptYet$);
  };
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
  const handleChangeListAcceptYet = (id: number) => {
    let listCurrent: any[] = [...listBookingAcceptYet];
    listCurrent = listCurrent && listCurrent.filter((x) => x.id !== id);
    setListBookingAcceptYet(listCurrent);
  };
  const handleChangeListAccept = (id: number) => {
    let listCurrent: any[] = [...listBookingAccepted];
    listCurrent = listCurrent && listCurrent.filter((x) => x.id !== id);
    setListBookingAccepted(listCurrent);
  };
  const handleChangeListRefused = (id: number) => {
    let listCurrent: any[] = [...listBookingRefused];
    listCurrent = listCurrent && listCurrent.filter((x) => x.id !== id);
    setListBookingRefused(listCurrent);
  };
  const handleChangeListFinished = (id: number) => {
    let listCurrent: any[] = [...listBookingFinished];
    listCurrent = listCurrent && listCurrent.filter((x) => x.id !== id);
    setListBookingFinished(listCurrent);
  };
  const handleChangeListConfirmYet = (id: number) => {
    let listCurrent: any[] = [...listBookingConfirmedYet];
    listCurrent = listCurrent && listCurrent.filter((x) => x.id !== id);
    setListBookingConfirmedYet(listCurrent);
  };
  const handleChangeListSearch = (id: number) => {
    let listCurrent: any[] = [...listForSearch];
    listCurrent = listCurrent && listCurrent.filter((x) => x.id !== id);
    setListForSearch(listCurrent);
  };
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleOpenBoxSearch = async () => {
    setIsOpenBoxSearch(!isOpenBoxSearch);
    if (listForSearch.length === 0) {
      const response =
        await MyBookingAdminModuleController.getAllBookingForSearch(
          admin_id,
          token
        );
      setListForSearch(response);
    }
    if (isOpenBoxSearch === false) {
      setListResultForSearch([]);
      setSearchValue("");
    }
  };
  const handleSelectSearch = (e: any) => {
    setSearchMethod(e.target.value);
  };
  const handleSearch = () => {
    if (searchMethod === ESearchMethod.none) {
      toast.warn("Vui lòng chọn phương thức tìm kiếm", toastConfigs);
      return;
    }
    if (searchValue.length === 0) {
      setListResultForSearch([]);
      return;
    }
    switch (searchMethod) {
      case ESearchMethod.phone: {
        searchByPhone();
        break;
      }
      case ESearchMethod.email: {
        searchByEmail();
        break;
      }
      case ESearchMethod.code: {
        searchByCode();
        break;
      }
    }
  };
  const searchByCode = () => {
    const result = listForSearch.filter((x) => {
      const code = `b${x.id}id`;
      return code === searchValue.toLowerCase();
    });
    setListResultForSearch(result);
  };
  const searchByPhone = () => {
    if (
      !ValidatorCustomModule.isPhoneNumber(searchValue) &&
      searchValue.length >= 11
    ) {
      toast.error(
        "Số điện thoại không đúng định dạng.Vui lòng kiểm tra lại",
        toastConfigs
      );
      setSearchValue("");
      return;
    }
    if (searchValue.length > 11) {
      toast.error(
        "Số điện thoại không đúng định dạng.Vui lòng kiểm tra lại",
        toastConfigs
      );
      setSearchValue("");
      return;
    }
    const result = listForSearch.filter((x) =>
      x.user.phoneNumber.includes(searchValue)
    );
    setListResultForSearch(result);
  };
  const searchByEmail = () => {
    const result = listForSearch.filter((x) =>
      x.user.email.includes(searchValue)
    );
    setListResultForSearch(result);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <article className=" p-3 ">
      <main className="space-y-3">
        <section>
          <h1 className="font-3 text-color6 xl:text-2xl text-lg flex space-x-1">
            <span className="pointer-events-none">Tìm kiếm</span>
            <section>
              <Tooltip
                title={`${isOpenBoxSearch ? "Đóng tím kiếm" : "Mở tìm kiếm"}`}
              >
                <button onClick={handleOpenBoxSearch} className="text-color6">
                  {isOpenBoxSearch ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </button>
              </Tooltip>
            </section>
          </h1>
          {isOpenBoxSearch && (
            <div
              className={`flex justify-center md:justify-start md:space-x-3 md:flex-row flex-col space-y-3 md:space-y-0 font-2`}
            >
              <select
                className="rounded-md h-10 px-2 text-color2 outline-none bg-color7 shadow-xl font-3"
                onChange={(e) => {
                  handleSelectSearch(e);
                }}
              >
                <option value={ESearchMethod.none} defaultValue={searchMethod}>
                  Chọn phương thức tìm kiếm
                </option>
                <option value={ESearchMethod.phone}>Số điện thoại</option>
                <option value={ESearchMethod.email}>Email</option>
                <option value={ESearchMethod.code}>Mã số thứ tự</option>
              </select>
              <input
                type="text"
                placeholder="Nhập giá trị tìm kiếm"
                className="h-10 px-2 rounded-md bg-color7 shadow-xl outline-none "
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSearch}
              >
                <span className="font-3">Lọc</span>
              </Button>
            </div>
          )}
        </section>
        {isOpenBoxSearch && (
          <section className={`space-y-3`}>
            <h1 className="font-3 text-color6 xl:text-2xl ">
              {listResultForSearch.length} Kết quả tìm kiếm
            </h1>
            <ul
              className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 `}
            >
              {listResultForSearch &&
                listResultForSearch.map((booking: any, index: number) => (
                  <li
                    key={index}
                    className="p-3 rounded space-y-2 flex flex-col justify-between shadow-xl hover:shadow-2xl"
                  >
                    <CardBookingAdmin
                      data={booking}
                      handleChangeList={handleChangeListSearch}
                      admin_id={admin_id}
                      token={token}
                      toastOptions={toastConfigs}
                      user_service={booking.uService}
                    />
                  </li>
                ))}
            </ul>
            <Divider />
          </section>
        )}

        <section className="md:flex md:justify-between md:items-center space-y-2 md:space-y-0">
          <h1 className="font-3 text-color6 xl:text-2xl text-lg  flex space-x-1">
            <span className="pointer-events-none">
              Danh sách các hồ sơ khách hàng
            </span>
            <section>
              <Tooltip title={`${isOpen ? "Đóng danh sách" : "Mở danh sách"}`}>
                <button onClick={handleOpen} className="text-color6">
                  {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </button>
              </Tooltip>
            </section>
          </h1>
          <Suspense fallback={<Loading />}>
            <CreateBooking
              initAllMyBooking={init}
              admin_id={admin_id}
              token={token}
            />
          </Suspense>
        </section>
        <section className={`${isOpen ? "" : "hidden"} space-y-3`}>
          <h1 className="font-3 text-color2 text-xl">
            Danh sách chưa xác nhận
            <p>Số lượng: {listBookingConfirmedYet.length}</p>
          </h1>
          <ul
            className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 `}
          >
            {listBookingConfirmedYet &&
              listBookingConfirmedYet.map((booking: any, index: number) => (
                <li
                  key={index}
                  className="p-3 rounded space-y-2 flex flex-col justify-between shadow-xl hover:shadow-2xl"
                >
                  <CardBookingAdmin
                    user_service={booking.uService}
                    data={booking}
                    handleChangeList={handleChangeListConfirmYet}
                    admin_id={admin_id}
                    token={token}
                    toastOptions={toastConfigs}
                  />
                </li>
              ))}
          </ul>
          {listBookingConfirmedYet.length >= 8 && (
            <div className="flex items-center justify-center">
              <button
                className="bg-color5 text-color2 px-2 py-1 rounded hover:bg-color4 font-3 shadow hover:shadow-md"
                onClick={handleLoadListConfirmYet}
              >
                Tải thêm hồ sơ
              </button>
            </div>
          )}
        </section>
        <section className={`${isOpen ? "" : "hidden"} space-y-3`}>
          <h1 className="font-3 text-color2 text-xl">
            Danh sách chưa chấp nhận
            <p>Số lượng: {listBookingAcceptYet.length}</p>
          </h1>
          <ul
            className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 `}
          >
            {listBookingAcceptYet &&
              listBookingAcceptYet.map((booking: any, index: number) => (
                <li
                  key={index}
                  className="p-3 rounded space-y-2 flex flex-col justify-between shadow-xl hover:shadow-2xl"
                >
                  <CardBookingAdmin
                    user_service={booking.uService}
                    data={booking}
                    handleChangeList={handleChangeListAcceptYet}
                    admin_id={admin_id}
                    token={token}
                    toastOptions={toastConfigs}
                  />
                </li>
              ))}
          </ul>
          {listBookingAcceptYet.length >= 8 && (
            <div className="flex items-center justify-center">
              <button
                className="bg-color5 text-color2 px-2 py-1 rounded hover:bg-color4 font-3 shadow hover:shadow-md"
                onClick={handleLoadListAcceptedYet}
              >
                Tải thêm hồ sơ
              </button>
            </div>
          )}
        </section>
        <section className={`${isOpen ? "" : "hidden"} space-y-3`}>
          <h1 className="font-3 text-color2 text-xl">
            Danh sách chưa kết thúc
            <p>Số lượng: {listBookingAccepted.length}</p>
          </h1>
          <ul
            className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 `}
          >
            {listBookingAccepted &&
              listBookingAccepted.map((booking: any, index: number) => (
                <li
                  key={index}
                  className="p-3 rounded space-y-2 flex flex-col justify-between shadow-xl hover:shadow-2xl"
                >
                  <CardBookingAdmin
                    user_service={booking.uService}
                    data={booking}
                    handleChangeList={handleChangeListAccept}
                    admin_id={admin_id}
                    token={token}
                    toastOptions={toastConfigs}
                  />
                </li>
              ))}
          </ul>
          {listBookingAccepted.length >= 8 && (
            <div className="flex items-center justify-center">
              <button
                className="bg-color5 text-color2 px-2 py-1 rounded hover:bg-color4 font-3 shadow hover:shadow-md"
                onClick={handleLoadListAccepted}
              >
                Tải thêm hồ sơ
              </button>
            </div>
          )}
        </section>
        <section className={`${isOpen ? "" : "hidden"} space-y-3`}>
          <h1 className="font-3 text-color2 text-xl">
            Danh sách từ chối <p>Số lượng: {listBookingRefused.length}</p>
          </h1>
          <ul
            className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 `}
          >
            {listBookingRefused &&
              listBookingRefused.map((booking: any, index: number) => (
                <li
                  key={index}
                  className="p-3 rounded space-y-2 flex flex-col justify-between shadow-xl hover:shadow-2xl"
                >
                  <CardBookingAdmin
                    user_service={booking.uService}
                    data={booking}
                    handleChangeList={handleChangeListRefused}
                    admin_id={admin_id}
                    token={token}
                    toastOptions={toastConfigs}
                  />
                </li>
              ))}
          </ul>
          {listBookingRefused.length >= 8 && (
            <div className="flex items-center justify-center">
              <button
                className="bg-color5 text-color2 px-2 py-1 rounded hover:bg-color4 font-3 shadow hover:shadow-md"
                onClick={handleLoadListRefused}
              >
                Tải thêm hồ sơ
              </button>
            </div>
          )}
        </section>
        <section className={`${isOpen ? "" : "hidden"} space-y-3`}>
          <h1 className="font-3 text-color2 text-xl">
            Danh sách hoàn thành <p>Số lượng: {listBookingFinished.length}</p>
          </h1>
          <ul
            className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 `}
          >
            {listBookingFinished &&
              listBookingFinished.map((booking: any, index: number) => (
                <li
                  key={index}
                  className="p-3 rounded space-y-2 flex flex-col justify-between shadow-xl hover:shadow-2xl"
                >
                  <CardBookingAdmin
                    user_service={booking.uService}
                    data={booking}
                    handleChangeList={handleChangeListFinished}
                    admin_id={admin_id}
                    token={token}
                    toastOptions={toastConfigs}
                  />
                </li>
              ))}
          </ul>
          {listBookingFinished.length >= 8 && (
            <div className="flex items-center justify-center">
              <button
                className="bg-color5 text-color2 px-2 py-1 rounded hover:bg-color4 font-3 shadow hover:shadow-md"
                onClick={handleLoadListFinished}
              >
                Tải thêm hồ sơ
              </button>
            </div>
          )}
        </section>
      </main>
    </article>
  );
};
export const icons = {
  checked: <img src={checkedImg} alt="checked" className="w-5" />,
  refused: <img src={refuseImg} alt="refuse" className="w-5" />,
};
interface ICardBookingAdminProps extends IAllBookingAdminProps {
  user_service: any;
  data: any;
  handleChangeList: (id: number) => void;
  toastOptions: ToastOptions;
}
const CardBookingAdmin: React.FC<ICardBookingAdminProps> = ({
  user_service,
  data,
  handleChangeList,
  admin_id,
  token,
  toastOptions,
}) => {
  const [status, setStatus] = useState<{
    rejected: boolean;
    accepted: boolean;
    finished: boolean;
    confirm: boolean;
    overDate: boolean;
  }>({
    accepted: false,
    rejected: false,
    finished: false,
    confirm: false,
    overDate: false,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [openSendMessage, setOpenSendMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const refreshCode = async () => {
    await MyBookingAdminModuleController.refreshCode(
      { toast: toast, options: toastOptions },
      token,
      {
        bid: data.id,
        admin_id: admin_id,
      }
    );
  };
  const confirm = async (e: any) => {
    setCode(e);
    if (e.length < 6) return;
    const re = await MyBookingAdminModuleController.confirm(
      { toast: toast, options: toastOptions },
      token,
      {
        bid: data.id,
        admin_id: admin_id,
        code: parseInt(e),
      }
    );
    if (re) setOpenConfirm(!openConfirm);
    else setCode("");
  };
  const changeStatusOpenSendMessage = () => {
    if (openSendMessage) {
      setMessage("");
    }
    setOpenSendMessage(!openSendMessage);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (res: boolean) => {
    setOpen(false);
    if (!res) return;
    handleMoveToHistory();
  };
  const init = () => {
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
    setStatus({
      accepted: data.accepted,
      finished: data.finished,
      rejected: data.rejected,
      confirm: data.confirm,
      overDate: overDate,
    });
  };
  const handleReject = async () => {
    await MyBookingAdminModuleController.handleMyBookings(
      admin_id,
      token,
      data.id,
      EAction.REJECT,
      { toast: toast, options: toastOptions }
    );
    setStatus({ ...status, rejected: true });
  };
  const handleAccept = async () => {
    await MyBookingAdminModuleController.handleMyBookings(
      admin_id,
      token,
      data.id,
      EAction.ACCEPT,
      { toast: toast, options: toastOptions }
    );
    setStatus({ ...status, accepted: true });
  };
  const handleFinish = async () => {
    const re = await MyBookingAdminModuleController.handleMyBookings(
      admin_id,
      token,
      data.id,
      EAction.FINISH,
      { toast: toast, options: toastOptions }
    );
    if (re) setStatus({ ...status, finished: true });
  };
  const handleMoveToHistory = async () => {
    await MyBookingAdminModuleController.deleteByIdBooking(
      admin_id,
      token,
      data.id
    );
    handleChangeList(data.id);
  };
  const sendMessage = async () => {
    changeStatusOpenSendMessage();
    const src =
      `\n📤Thông báo đến từ hồ sơ ${data.id}id\n🔡Nội dung: ` + message;
    await TelebotModuleController.sendMessage(
      token,
      data.user.phoneNumber,
      src,
      { toast: toast, options: toastOptions }
    );
    setMessage("");
  };
  useEffect(() => {
    init();
  }, [data]);
  const [openEditNote, setOpenEditNote] = useState<boolean>(false);
  const [note, setNote] = useState<string>(data.note);
  const handleEditNote = async () => {
    if (note) {
      await MyBookingAdminModuleController.updateNote(
        admin_id,
        token,
        note,
        data.id,
        { toast: toast, options: toastOptions }
      );
    }
    setOpenEditNote(!openEditNote);
  };
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 font-2">
        <div className="">
          <h1 className="font-3">Thông tin khách hàng</h1>
          <ul>
            <li>
              <span>Mã số thứ tự: b{data.id}id</span>
            </li>
            <li>
              <span>Họ tên đệm: {data.user.firstName}</span>
            </li>
            <li>
              <span>Tên: {data.user.lastName}</span>
            </li>
            <li>
              <span>Tuổi: {data.user.age}</span>
            </li>
            <li>
              <span>
                Giới tính: {data.user.sex === "female" ? "Nữ" : "Nam"}
              </span>
            </li>
            <li>
              <span>Số điện thoại: {data.user.phoneNumber}</span>
            </li>
            <li>
              <span>Email: {data.user.email}</span>
            </li>
          </ul>
        </div>
        <div className="">
          <h1 className="font-3">Trạng thái lịch hẹn</h1>
          <ul className="space-y-1">
            <li className="flex space-x-1 items-center">
              <span>{status.confirm ? icons.checked : icons.refused}</span>
              <span>Xác thực</span>
            </li>
            <li className="flex space-x-1 items-center">
              <span>{status.rejected ? icons.checked : icons.refused}</span>
              <span>Từ chối</span>
            </li>
            <li className="flex space-x-1 items-center">
              <span>{status.accepted ? icons.checked : icons.refused}</span>
              <span>Chấp nhận</span>
            </li>
            <li className="flex space-x-1 items-center">
              <span>{status.finished ? icons.checked : icons.refused}</span>
              <span>Hoàn thành</span>
            </li>
            <li className="flex space-x-1 items-center">
              <span>{status.overDate ? icons.checked : icons.refused}</span>
              <span>Quá thời gian</span>
            </li>
          </ul>
          <div className="flex space-x-3 items-center">
            <h1 className="card-info-title">Ghi chú</h1>
            <button onClick={handleEditNote}>
              <img
                src={openEditNote ? saveIcon : pencilIcon}
                alt="edit"
                className="w-4 h-4x"
              />
            </button>
          </div>
          <textarea
            disabled={!openEditNote}
            className={`bg-slate-200 p-1 w-full h-20 rounded font-2 outline-none ${
              openEditNote ? "ring-2" : ""
            }`}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </div>
        <div className="">
          <h1 className="font-3">Dịch vụ sử dụng</h1>
          <ul className="">
            <li>
              <span>Tên dịch vụ: {user_service?.service?.name}</span>
            </li>
            <li>
              <span>Giá dịch vụ: {user_service?.service?.price}kVNĐ</span>
            </li>
          </ul>
        </div>
        <div className="">
          <h1 className="font-3">Thông tin lịch hẹn</h1>
          <ul className="card-info-list">
            <li>
              <span>Ngày đặt lịch hẹn: {data.timeInit}</span>
            </li>
            <li>
              <span>Ngày hẹn: {data.appointment_date}</span>
            </li>
            <li>
              <span>
                Ngày hoàn thành:{" "}
                {data.finished_at
                  ? (data.finished_at + "").split("-").reverse().join("-")
                  : "Chưa hoàn thành"}
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section className="flex justify-between items-center">
        <div className="xl:space-x-2 flex flex-col xl:flex-row xl:space-y-0 space-y-2">
          {status.confirm === false && status.overDate === false && (
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setOpenConfirm(!openConfirm);
                }}
              >
                <span className="font-3">Xác thực</span>
              </Button>
              <Dialog
                open={openConfirm}
                onClose={() => {
                  setOpenConfirm(!openConfirm);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <span className="font-3">Vui lòng nhập mã xác thực</span>
                </DialogTitle>
                <DialogContent>
                  <section className="flex flex-col justify-center items-center space-y-3">
                    <HStack>
                      <PinInput
                        value={code}
                        onChange={(e) => {
                          confirm(e);
                        }}
                      >
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <button
                      className="bg-color5 text-color2 px-2 py-1 rounded hover:bg-color4 font-3 shadow hover:shadow-md"
                      onClick={refreshCode}
                    >
                      Gửi lại mã xác thực
                    </button>
                  </section>
                </DialogContent>
              </Dialog>
            </div>
          )}
          {status.overDate === false &&
          status.confirm === true &&
          status.rejected === false &&
          status.accepted === false &&
          status.finished === false ? (
            <>
              <Button
                onClick={handleReject}
                variant="contained"
                color="secondary"
                className="bg-red-400"
              >
                <span className="font-3">Từ chối</span>
              </Button>
              <Button
                onClick={handleAccept}
                variant="contained"
                color="primary"
                className="bg-red-400"
              >
                <span className="font-3">Chấp nhận</span>
              </Button>
            </>
          ) : (
            ""
          )}
          {status.rejected === false &&
          status.accepted === true &&
          status.finished === false ? (
            <>
              <Button
                onClick={handleFinish}
                variant="contained"
                color="primary"
                className="bg-red-400"
              >
                <span className="font-3">Hoàn thành</span>
              </Button>
            </>
          ) : (
            ""
          )}
          {(status.rejected === false &&
            status.accepted === true &&
            status.finished === true) ||
          (status.rejected === true &&
            status.accepted === false &&
            status.finished === false) || status.overDate === true? (
            <>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClickOpen}
                >
                  <span className="font-3">Xóa</span>
                </Button>
                <Dialog
                  open={open}
                  onClose={()=>{setOpen(false)}}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    <span className="font-3">
                      {"Bạn có chắc chắn là muốn xóa?"}
                    </span>
                  </DialogTitle>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        handleClose(false);
                      }}
                      color="secondary"
                      variant="contained"
                    >
                      <span className="font-3">Húy</span>
                    </Button>
                    <Button
                      onClick={() => {
                        handleClose(true);
                      }}
                      color="primary"
                      variant="contained"
                      autoFocus
                    >
                      <span className="font-2">Đồng ý</span>
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={changeStatusOpenSendMessage}
            >
              <span className="font-3">Gửi thông báo</span>
            </Button>
            <Dialog
              open={openSendMessage}
              onClose={changeStatusOpenSendMessage}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <span className="font-3 text-color2">
                  Gửi tin nhắn thông báo đến hồ sơ {data.id}id của{" "}
                  {data.user.lastName}
                </span>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <h1 className="font-3 text-color2">Tin nhắn</h1>
                  <textarea
                    className="w-full h-36 outline-none border-2 rounded text-color2 font-2 p-2"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    changeStatusOpenSendMessage();
                  }}
                  color="secondary"
                  variant="contained"
                >
                  <span className="font-3">Húy</span>
                </Button>
                <Button
                  onClick={sendMessage}
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  <span className="font-3">Gửi tin nhắn</span>
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </section>
    </>
  );
};
export default AllBookingAdmin;
