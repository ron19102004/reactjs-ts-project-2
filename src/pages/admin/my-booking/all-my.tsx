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
import { Divider } from "@chakra-ui/react";
import { Loading } from ".";
import { TelebotModuleController } from "./telebot.controller";
import { EditUserServiceModuleController } from "../edit-info/edit-info.controller";

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
  const [list, setList] = useState<any[]>([]);
  const [limit, setLimit] = useState<{ take: number; skip: number }>({
    take: 8,
    skip: 0,
  });
  const [searchMethod, setSearchMethod] = useState<ESearchMethod>(
    ESearchMethod.none
  );
  const [listForSearch, setListForSearch] = useState<any[]>([]);
  const [listResultForSearch, setListResultForSearch] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [listUService, setListUService] = useState<any[]>([]);
  const init = async () => {
    const bookings = await MyBookingAdminModuleController.getAllMyBookings(
      admin_id,
      {
        take: limit.take,
        skip: limit.skip,
      },
      token
    );
    setList(bookings);
    const listUService$ =
      await EditUserServiceModuleController.getAdminAndServiceForAd(
        admin_id,
        token
      );
    setListUService(listUService$);
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
  const handleChangeList = (id: number) => {
    let listCurrent = [...list];
    listCurrent = listCurrent && listCurrent.filter((x) => x.id !== id);
    setList(listCurrent);
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
  const handleLoadList = async () => {
    const takeNew: number = limit.take + 5;
    setLimit({ ...limit, take: takeNew });
    const bookings = await MyBookingAdminModuleController.getAllMyBookings(
      admin_id,
      {
        take: limit.take,
        skip: limit.skip,
      },
      token
    );
    setList(bookings);
  };
  const handleSelectSearch = (e: any) => {
    setSearchMethod(e.target.value);
  };
  const handleSearch = (e: any) => {
    if (searchMethod === ESearchMethod.none) {
      toast.warn("Vui lòng chọn phương thức tìm kiếm", toastConfigs);
      return;
    }
    setSearchValue(e.target.value.trim());
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
  const findUService = (id: number) => {
    const listCopy = [...listUService];
    const index = listCopy.findIndex((x) => x.id + "" === id + "");
    return listCopy[index];
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <article className="bg-color2 p-3 ">
      <main className="space-y-3">
        <section>
          <h1 className="font-3 text-white xl:text-2xl text-lg flex space-x-1">
            <span className="pointer-events-none">Tìm kiếm</span>
            <section>
              <Tooltip
                title={`${isOpenBoxSearch ? "Đóng tím kiếm" : "Mở tìm kiếm"}`}
              >
                <button onClick={handleOpenBoxSearch} className="text-white">
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
                className="rounded h-10 px-2 text-color2 outline-none"
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
                className="h-10 px-2 rounded outline-none"
                value={searchValue}
                onChange={(e) => {
                  handleSearch(e);
                }}
              />
            </div>
          )}
        </section>
        {isOpenBoxSearch && (
          <section className={`space-y-3`}>
            <h1 className="font-3 text-white xl:text-2xl ">
              {listResultForSearch.length} Kết quả tìm kiếm
            </h1>
            <ul
              className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 `}
            >
              {listResultForSearch &&
                listResultForSearch.map((booking: any, index: number) => (
                  <li key={index} className="bg-color7 p-3 rounded space-y-2">
                    <CardBookingAdmin
                      data={booking}
                      handleChangeList={handleChangeList}
                      admin_id={admin_id}
                      token={token}
                      toastOptions={toastConfigs}
                      user_service={findUService(booking.uService.id)}
                    />
                  </li>
                ))}
            </ul>
            <Divider />
          </section>
        )}

        <section className="md:flex md:justify-between md:items-center space-y-2 md:space-y-0">
          <h1 className="font-3 text-white xl:text-2xl text-lg  flex space-x-1">
            <span className="pointer-events-none">
              Danh sách các hồ sơ khách hàng
            </span>
            <section>
              <Tooltip title={`${isOpen ? "Đóng danh sách" : "Mở danh sách"}`}>
                <button onClick={handleOpen} className="text-white">
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
          <ul
            className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 `}
          >
            {list &&
              list.map((booking: any, index: number) => (
                <li
                  key={index}
                  className="bg-color7 p-3 rounded space-y-2 flex flex-col justify-between"
                >
                  <CardBookingAdmin
                    user_service={findUService(booking.uService.id)}
                    data={booking}
                    handleChangeList={handleChangeList}
                    admin_id={admin_id}
                    token={token}
                    toastOptions={toastConfigs}
                  />
                </li>
              ))}
          </ul>
          <div className="flex items-center justify-center">
            <button className="bg-color5 text-color2 px-2 py-1 rounded hover:bg-color4 font-3 shadow hover:shadow-md" onClick={handleLoadList}>
              Tải thêm hồ sơ
            </button>
          </div>
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
  }>({
    accepted: false,
    rejected: false,
    finished: false,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [openSendMessage, setOpenSendMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
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
    setStatus({
      accepted: data.accepted,
      finished: data.finished,
      rejected: data.rejected,
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
    await MyBookingAdminModuleController.handleMyBookings(
      admin_id,
      token,
      data.id,
      EAction.FINISH,
      { toast: toast, options: toastOptions }
    );
    setStatus({ ...status, finished: true });
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
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 font-2">
        <div className="card-info">
          <h1 className="card-info-title">Thông tin khách hàng</h1>
          <ul className="card-info-list">
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
        <div className="card-info">
          <h1 className="card-info-title">Trạng thái lịch hẹn</h1>
          <ul className="card-info-list space-y-1">
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
          </ul>
          <h1 className="card-info-title">Ghi chú</h1>
          <textarea
            disabled={true}
            className=" bg-color7 p-1 w-full h-20 rounded font-2 text-color2 outline-none"
            value={`Ghi chú: ${data.note ?? "Không có"}`}
          />
        </div>
        <div className="card-info">
          <h1 className="card-info-title">Dịch vụ sử dụng</h1>
          <ul className="card-info-list">
            <li>
              <span>Tên dịch vụ: {user_service?.service?.name}</span>
            </li>
            <li>
              <span>Giá dịch vụ: {user_service?.service?.price}k</span>
            </li>
          </ul>
        </div>
        <div className="card-info">
          <h1 className="card-info-title">Thông tin lịch hẹn</h1>
          <ul className="card-info-list">
            <li>
              <span>Ngày đặt lịch hẹn: {data.timeInit}</span>
            </li>
            <li>
              <span>
                Ngày hoàn thành: {data.finished_at ?? "Chưa hoàn thành"}
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section className="flex justify-between items-center">
        <div className="space-x-2">
          {status.rejected === false &&
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
            status.finished === false) ? (
            <>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClickOpen}
                >
                  <span className="font-3">Đưa vào lịch sử hồ sơ</span>
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    <span className="font-3">
                      {"Bạn có chắc chắn là muốn đưa hồ sơ vào lịch sử không?"}
                    </span>
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Sau khi đưa hồ sơ vào lịch sử hồ sơ, bạn có thể kiểm tra
                      chúng lại mục hồ sơ lưu trữ.
                    </DialogContentText>
                  </DialogContent>
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
