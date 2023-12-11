/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { EditUserServiceModuleController } from "../edit-info/edit-info.controller";
import { Tooltip } from "@material-ui/core";
import pencilIcon from "../../../assets/pencil.png";
import saveIcon from "../../../assets/save.png";
import resetAvt from "../../../assets/image-file-reset.png";
import { ToastOptions, toast } from "react-toastify";
import { ProfileModuleController } from "./profile.controller";
import { useDispatch } from "react-redux";
import { AuthModuleController } from "../../auths/auth.controller";
import { IDetailsWork } from "./accounts-admin";

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
export interface IDetailsUser {
  id: number;
  address: string;
  age: number;
  sex: ESex;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
export enum ESex {
  male = "male",
  female = "female",
}
interface IMyProfileAdminProps {
  userCurrent: any;
  token: string;
}
const MyProfileAdmin: React.FC<IMyProfileAdminProps> = ({
  userCurrent,
  token,
}) => {
  const dispatch = useDispatch();
  const [listUService, setListUService] = useState<any[]>([]);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [details, setDetails] = useState<IDetailsUser>({
    address: userCurrent?.address,
    age: userCurrent?.age,
    avatar: userCurrent?.avatar,
    email: userCurrent?.email,
    firstName: userCurrent?.firstName,
    id: userCurrent?.id,
    lastName: userCurrent?.lastName,
    phoneNumber: userCurrent?.phoneNumber,
    sex: userCurrent?.sex,
  });
  const [detailsWork, setDetailsWork] = useState<IDetailsWork>({
    areas_of_expertise: userCurrent?.areas_of_expertise,
    bio: userCurrent?.bio,
    member_of_organization: userCurrent?.member_of_organization,
    position: userCurrent?.position,
    id: userCurrent?.id,
  });
  const [detailsWorkBackup, setDetailsWorkBackup] = useState<IDetailsWork>({
    areas_of_expertise: userCurrent?.areas_of_expertise,
    bio: userCurrent?.bio,
    member_of_organization: userCurrent?.member_of_organization,
    position: userCurrent?.position,
    id: userCurrent?.id,
  });
  const changeStatusOpenEdit = async () => {
    if (!openEdit) {
      setDetailsWorkBackup(detailsWork);
    }
    if (openEdit) {
      if (
        (details.address.length > 0 &&
          Number.isNaN(details.age) === false &&
          details.avatar.length > 0 &&
          details.firstName.length > 0 &&
          details.lastName.length > 0) === false
      ) {
        toast.warn("Các ô giá trị không được trống", toastConfigs);
        return;
      }
      const re = await ProfileModuleController.updateProfile(
        details,
        { toast: toast, options: toastConfigs },
        token,
        details.id
      );
      const re$ = await ProfileModuleController.updateInfoWorkForMaster(
        detailsWork,
        { toast: toast, options: toastConfigs },
        token
      );
      if (!re) return;
      if (!re$) setDetailsWork(detailsWorkBackup);
      await AuthModuleController.reloadUserCurrent$(dispatch, token);
    }
    setOpenEdit(!openEdit);
  };
  const init = async () => {
    await AuthModuleController.reloadUserCurrent$(dispatch, token);
    const uServices =
      await EditUserServiceModuleController.getAdminAndServiceForAd(
        userCurrent?.id,
        token
      );
    setListUService(uServices);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <section className="font-2 space-y-1">
        <div className="flex flex-col justify-center items-center p-3 space-y-3">
          <div className={`relative opacity-100`}>
            <Tooltip title={"Chỉnh sửa thông tin cá nhân"}>
              <button
                className={`z-10 w-8 h-8 absolute right-3 top-2.5 rounded-full p-1 flex justify-center items-center ${
                  openEdit ? "bg-color2" : "bg-color1"
                }`}
                onClick={changeStatusOpenEdit}
              >
                <img
                  src={openEdit ? saveIcon : pencilIcon}
                  alt="edit"
                  className="w-5 h-5 shadow rounded-full object-cover"
                />
              </button>
            </Tooltip>
            <div className="w-48 h-48 overflow-hidden rounded-full ring-4 ring-color5 transition-all">
              <img
                src={details.avatar}
                alt="avatar"
                className="w-48 h-48 hover:scale-150 transition-all object-cover"
              />
            </div>
            {openEdit && (
              <div className="w-[90%] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center space-y-2">
                <input
                  type="url"
                  value={userCurrent?.avatar}
                  className="h-10 ring-4 outline-none w-full px-3 rounded bg-color2 font-3 text-color5 object-cover"
                  onChange={(e) => {
                    setDetails({ ...details, avatar: e.target.value });
                  }}
                />
                <button
                  className="absolute -bottom-[90%]"
                  onClick={() => {
                    setDetails({ ...details, avatar: userCurrent?.avatar });
                  }}
                >
                  <img
                    src={resetAvt}
                    alt="resetAvt"
                    className="w-8 h-8 rounded object-cover"
                  />
                </button>
              </div>
            )}
          </div>
          <h1 className="font-3 text-color1 text-4xl text-center">
            {details.firstName} {details.lastName}
          </h1>
          <h2 className="font-3 underline text-color1 text-lg text-center">
            {detailsWork?.position?.toUpperCase()}
          </h2>
          {openEdit && (
            <div className="space-y-3 flex flex-col ">
              <input
                type="text"
                value={details.firstName}
                className="h-8 ring-4 outline-none px-3 rounded bg-color2 font-3 text-color5 text-center"
                placeholder="Họ tên đệm"
                onChange={(e) => {
                  setDetails({ ...details, firstName: e.target.value });
                }}
              />
              <input
                type="text"
                value={details.lastName}
                className="h-8 ring-4 outline-none px-3 rounded bg-color2 font-3 text-color5 text-center"
                placeholder="Tên"
                onChange={(e) => {
                  setDetails({ ...details, lastName: e.target.value });
                }}
              />
            </div>
          )}
        </div>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
          <div className="bg-white card-profile-custom rounded-md p-3">
            <h1 className="font-3 text-color1 text-2xl text-center">
              Thông tin cá nhân
            </h1>
            <h2 className="text-color2 font-2 text-lg ">Mã thông tin: {details.id}</h2>
            <h2 className="text-color2 font-2 text-lg ">
              Email:
              <input
                disabled={!openEdit}
                type="email"
                required
                value={`${details.email}`}
                className={`disabled:bg-white outline-none px-1 rounded-md h-8 ${
                  openEdit ? "ring-4 w-full bg-color2 text-color5 " : "w-[80%] "
                }`}
                onChange={(e) => {
                  setDetails({ ...details, email: e.target.value });
                }}
              />
            </h2>
            <h2 className="text-color2 font-2 text-lg ">
              SĐT:
              <input
                disabled={!openEdit}
                type="tel"
                required
                value={`${details.phoneNumber}`}
                className={`disabled:bg-white outline-none px-1 rounded-md h-8 ${
                  openEdit ? "ring-4 w-full bg-color2 text-color5 " : ""
                }`}
                onChange={(e) => {
                  setDetails({ ...details, phoneNumber: e.target.value });
                }}
              />
            </h2>
            <h2 className="text-color2 font-2 text-lg ">
              Địa chỉ:{" "}
              <input
                disabled={!openEdit}
                type="text"
                required
                value={`${details.address}`}
                className={`disabled:bg-white outline-none px-1 rounded-md h-8 ${
                  openEdit ? "ring-4 w-full bg-color2 text-color5 " : ""
                }`}
                onChange={(e) => {
                  setDetails({ ...details, address: e.target.value });
                }}
              />
            </h2>
            <h2 className="text-color2 font-2 text-lg ">
              Tuổi:{" "}
              <input
                disabled={!openEdit}
                type="number"
                required
                value={`${details.age}`}
                className={`disabled:bg-white outline-none px-1 rounded-md h-8 ${
                  openEdit ? "ring-4 w-full bg-color2 text-color5 " : ""
                }`}
                onChange={(e) => {
                  setDetails({ ...details, age: parseInt(e.target.value) });
                }}
              />
            </h2>
            <h2 className="text-color2 font-2 text-lg ">
              Giới tính:
              {!openEdit && (
                <span>{details.sex === "male" ? "Nam" : "Nữ"}</span>
              )}
              {openEdit && (
                <select
                  className={`outline-none p6x-1 rounded-md h-8 ${
                    openEdit ? "ring-4 w-full bg-color2 text-color5 " : ""
                  }`}
                  onChange={(e: any) => {
                    setDetails({ ...details, sex: e.target.value });
                  }}
                >
                  <option value={ESex.male}>Nam</option>
                  <option value={ESex.female}>Nữ</option>
                </select>
              )}
            </h2>
          </div>
          <div className="card-profile-custom bg-white rounded-md p-3">
            <h1 className="font-3 text-color1 text-2xl text-center">
              Trực thuộc chi nhánh - Khoa
            </h1>
            <h2 className="text-color2 font-2 text-lg ">
              Mã nhánh: {userCurrent?.branch.id ?? "Chưa có"}
            </h2>
            <h2 className="text-color2 font-2 text-lg ">
              Mã khoa: {userCurrent?.department.id ?? "Chưa có"}
            </h2>
            <h2 className="text-color2 font-2 text-lg ">
              Tên nhánh: {userCurrent?.branch.name ?? "Chưa có"}
            </h2>
            <h2 className="text-color2 font-2 text-lg ">
              Tên khoa: {userCurrent?.department.name ?? "Chưa có"}
            </h2>
            <h2 className="text-color2 font-2 text-lg ">
              Đường dây nóng: {userCurrent?.branch.hotline ?? "Chưa có"}
            </h2>
          </div>
          <div className="bg-white card-profile-custom rounded-md p-3">
            <h1 className="font-3 text-color1 text-2xl text-center">
              Thông tin công việc
            </h1>
            <h2 className="text-color2 font-2 text-lg ">
              Vị trí:{" "}
              <input
                disabled={!openEdit}
                type="text"
                required
                value={`${detailsWork.position ?? ""}`}
                className={`disabled:bg-white outline-none px-1 rounded-md h-8 ${
                  openEdit ? "ring-4 w-full bg-color2 text-color5 " : ""
                }`}
                onChange={(e) => {
                  setDetailsWork({ ...detailsWork, position: e.target.value });
                }}
                placeholder={detailsWork.position ? "" : "Chưa có"}
              />
            </h2>
            <h2 className="text-color2 font-2 text-lg ">
              Chuyên môn:{" "}
              <input
                disabled={!openEdit}
                type="text"
                required
                value={`${detailsWork.areas_of_expertise ?? ""}`}
                placeholder={detailsWork.areas_of_expertise ? "" : "Chưa có"}
                className={`disabled:bg-white outline-none px-1 rounded-md h-8 ${
                  openEdit ? "ring-4 w-full bg-color2 text-color5 " : ""
                }`}
                onChange={(e) => {
                  setDetailsWork({
                    ...detailsWork,
                    areas_of_expertise: e.target.value,
                  });
                }}
              />
            </h2>
            <h2 className="text-color2 font-2 text-lg ">
              Tổ chức:{" "}
              <input
                disabled={!openEdit}
                type="text"
                required
                value={`${detailsWork.member_of_organization ?? ""}`}
                placeholder={
                  detailsWork.member_of_organization ? "" : "Chưa có"
                }
                className={`disabled:bg-white outline-none px-1 rounded-md h-8 ${
                  openEdit ? "ring-4 w-full bg-color2 text-color5 " : ""
                }`}
                onChange={(e) => {
                  setDetailsWork({
                    ...detailsWork,
                    member_of_organization: e.target.value,
                  });
                }}
              />
            </h2>
            <h2 className="text-color2 font-2 text-lg ">
              Mô tả:{" "}
              <textarea
                disabled={!openEdit}
                required
                placeholder={detailsWork.bio ? "" : "Chưa có"}
                value={`${detailsWork.bio ?? ""}`}
                className={`disabled:bg-white h-full px-1 outline-none rounded-md w-full ${
                  openEdit ? "ring-4 bg-color2 text-color5 " : "border-2 "
                }`}
                onChange={(e) => {
                  setDetailsWork({ ...detailsWork, bio: e.target.value });
                }}
              />
            </h2>
          </div>
          <div className="bg-white card-profile-custom rounded-md p-3">
            <h1 className="font-3 text-color1 text-2xl text-center">
              Các dịch vụ của tôi
            </h1>
            <ul className="list-decimal m-3">
              {listUService &&
                listUService.map((item: any, index: number) => {
                  return (
                    <li className="text-color2 font-2 text-lg " key={index}>
                      {item?.service.name}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
export default MyProfileAdmin;
