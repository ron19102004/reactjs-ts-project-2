/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastOptions, toast } from "react-toastify";
import { IDetailsUser } from "../../admin/profile/my-profile";
import { ProfileModuleController } from "../../admin/profile/profile.controller";
import { AuthModuleController } from "../../auths/auth.controller";
import saveIcon from "../../../assets/save.png";
import pencilIcon from "../../../assets/pencil.png";

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
interface IMyProfileUserProps {
  userCurrent: any;
  token: string;
}
const MyProfileUser: React.FC<IMyProfileUserProps> = ({
  userCurrent,
  token,
}) => {
  const dispatch = useDispatch();
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
  const changeStatusOpenEdit = async () => {
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
      if (!re) return;
      await AuthModuleController.reloadUserCurrent$(dispatch, token);
    }
    setOpenEdit(!openEdit);
  };
  const init = async () => {
    await AuthModuleController.reloadUserCurrent$(dispatch, token);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div className="w-full h-[250px]">
          <img
            src={details?.avatar}
            className="w-full h-full animate-pulse object-cover blur rounded-tl-lg rounded-tr-lg"
          />
        </div>
        <div className="flex flex-col items-center -mt-20">
          <img
            src={details?.avatar}
            className="w-40 h-40 object-cover z-10 border-4 border-white rounded-full"
          />
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-2xl font-7">
                {details?.firstName} {details?.lastName}
              </p>
              <span className="bg-blue-500 rounded-full p-1" title="Verified">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-100 h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </span>
            </div>
            <div>
              <button
                type="button"
                className={
                  openEdit
                    ? "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center space-x-1 "
                    : "py-2.5 px-5 text-sm font-medium focus:outline-none rounded-full border   focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 flex items-center space-x-1"
                }
                onClick={changeStatusOpenEdit}
              >
                <div>
                  <img
                    src={!openEdit ? pencilIcon : saveIcon}
                    alt="icon"
                    className="w-4 h-4"
                  />
                </div>
                <div>{openEdit ? "Lưu thông tin" : "Chỉnh sửa thông tin"}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col ">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">
              Thông tin cá nhân
            </h4>
            <ul className="mt-2 text-gray-700">
              {openEdit && (
                <li className="flex items-center border-y py-2">
                  <span className="font-bold w-24">URL ảnh:</span>
                  <span className="text-gray-700">
                    <input
                      type="url"
                      required
                      value={details?.avatar}
                      className={`border outline-none px-2 py-1 rounded focus:ring`}
                      onChange={(e) => {
                        setDetails({ ...details, avatar: e.target.value });
                      }}
                    />
                  </span>
                </li>
              )}
              <li className="flex items-center border-y py-2">
                <span className="font-bold w-24">Họ tên đệm:</span>
                <span className="text-gray-700">
                  {!openEdit ? (
                    `${details?.firstName}`
                  ) : (
                    <input
                      type="text"
                      required
                      value={details?.firstName}
                      className={`border outline-none px-2 py-1 rounded focus:ring`}
                      onChange={(e) => {
                        setDetails({ ...details, firstName: e.target.value });
                      }}
                    />
                  )}
                </span>
              </li>
              <li className="flex items-center border-y py-2">
                <span className="font-bold w-24">Tên:</span>
                <span className="text-gray-700">
                  {!openEdit ? (
                    `${details?.lastName}`
                  ) : (
                    <input
                      type="text"
                      required
                      value={details?.lastName}
                      className={`border outline-none px-2 py-1 rounded focus:ring`}
                      onChange={(e) => {
                        setDetails({ ...details, lastName: e.target.value });
                      }}
                    />
                  )}
                </span>
              </li>
              <li className="flex items-center border-y py-2">
                <span className="font-bold w-24">Tuổi:</span>
                <span className="text-gray-700">
                  {!openEdit ? (
                    `${details?.age}`
                  ) : (
                    <input
                      type="number"
                      required
                      value={details?.age}
                      className={`border outline-none px-2 py-1 rounded focus:ring`}
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          age: parseInt(e.target.value),
                        });
                      }}
                    />
                  )}
                </span>
              </li>
              <li className="flex items-center border-y py-2">
                <span className="font-bold w-24">Số điện thoại:</span>
                <span className="text-gray-700">
                  {!openEdit ? (
                    `${details?.phoneNumber}`
                  ) : (
                    <input
                      type="tel"
                      required
                      value={details?.phoneNumber}
                      className={`border outline-none px-2 py-1 rounded focus:ring`}
                      onChange={(e) => {
                        setDetails({ ...details, phoneNumber: e.target.value });
                      }}
                    />
                  )}
                </span>
              </li>
              <li className="flex items-center border-y py-2">
                <span className="font-bold w-24">Email:</span>
                <span className="text-gray-700">
                  {!openEdit ? (
                    `${details?.email}`
                  ) : (
                    <input
                      type="email"
                      required
                      value={details?.email}
                      className={`border outline-none px-2 py-1 rounded focus:ring`}
                      onChange={(e) => {
                        setDetails({ ...details, email: e.target.value });
                      }}
                    />
                  )}
                </span>
              </li>
              <li className="flex items-center border-y py-2">
                <span className="font-bold w-24">Địa chỉ:</span>
                <span className="text-gray-700">
                  {!openEdit ? (
                    `${details?.address}`
                  ) : (
                    <input
                      type="text"
                      required
                      value={details?.address}
                      className={`border outline-none px-2 py-1 rounded focus:ring`}
                      onChange={(e) => {
                        setDetails({ ...details, address: e.target.value });
                      }}
                    />
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyProfileUser;
