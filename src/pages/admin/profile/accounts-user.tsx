/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import editIcon from "../../../assets/edit.png";
import checkedIcon from "../../../assets/checked.png";
import closeIcon from "../../../assets/reject.png";
import doctorIcon from "../../../assets/doctor.png";
import masterIcon from "../../../assets/master.png";
import userIcon from "../../../assets/user.png";
import refreshIcon from "../../../assets/refresh.png";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { ToastOptions, toast } from "react-toastify";
import { ProfileModuleController } from "./profile.controller";
import { ESex } from "./my-profile";
import { Role } from "../../../redux/reducers/auth.reducer";
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
  doctor: <img src={doctorIcon} alt="doctor" className="w-5" />,
  master: <img src={masterIcon} alt="master" className="w-5" />,
  user: <img src={userIcon} alt="user" className="w-5" />,
  refresh: <img src={refreshIcon} alt="reload" className="w-5" />,
};
interface IAccountsProps {
  admin_id: number;
  token: string;
}
const AccountsUser: React.FC<IAccountsProps> = ({ admin_id, token }) => {
  const [list, setList] = useState<any[]>([]);
  const init = async () => {
    const response = await ProfileModuleController.findAllAccountsForUser(
      token
    );
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
  return (
    <article className="font-2 space-y-3">
      <section className="space-y-3 md:space-y-0 md:flex md:space-x-2 md:items-center">
        <h1 className="font-7 xl:text-2xl text-lg  pointer-events-none ">
          Các tài khoản người dùng
        </h1>
      </section>
      <section className="overflow-x-auto w-full">
        <table className="branches-table min-w-full overflow-y-auto max-h-screen">
          <thead className="bg-color2 text-color7">
            <tr className="font-7">
              <th className="">Mã tài khoản (UID) </th>
              <th className="">Họ tên đệm</th>
              <th className="">Tên</th>
              <th className="">Tuổi</th>
              <th className="">Giới tính</th>
              <th className="">Email</th>
              <th className="">Số điện thoại</th>
              <th className="">Link ảnh đại diện</th>
              <th className="">Vị trí công việc</th>
              <th className="">Thành viên của tổ chức</th>
              <th className="">Lĩnh vực chuyên môn</th>
              <th className="">Bio</th>
              <th className="">Quyền</th>
              <th className="">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item: any, index: number) => {
                return (
                  <EditRowAccount
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
export interface IDetailsWork {
  id: number;
  areas_of_expertise: string;
  bio: string;
  member_of_organization: string;
  position: string;
}
const EditRowAccount: React.FC<{
  item: any;
  admin_id: number;
  token: string;
  handleDeleteItem: (id: number) => void;
}> = ({ item, token, handleDeleteItem }) => {
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const changeDialogDelete = () => {
    setOpenDialogDelete(!openDialogDelete);
  };
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const changeDialogEdit = () => {
    setOpenDialogEdit(!openDialogEdit);
  };
  const [details, setDetails] = useState<IDetailsUser>({
    address: item?.address,
    age: item?.age,
    avatar: item?.avatar,
    email: item?.email,
    firstName: item?.firstName,
    id: item?.id,
    lastName: item?.lastName,
    phoneNumber: item?.phoneNumber,
    sex: item?.sex,
  });
  const [detailsBackup, setDetailsBackup] = useState<IDetailsUser>({
    address: item?.address,
    age: item?.age,
    avatar: item?.avatar,
    email: item?.email,
    firstName: item?.firstName,
    id: item?.id,
    lastName: item?.lastName,
    phoneNumber: item?.phoneNumber,
    sex: item?.sex,
  });
  const [detailsWork] = useState<IDetailsWork>({
    areas_of_expertise: item?.areas_of_expertise,
    bio: item?.bio,
    member_of_organization: item?.member_of_organization,
    position: item?.position,
    id: item?.id,
  });
  const [role, setRole] = useState<Role>(item?.role);
  const upgradeRole = async () => {
    let role$ = role;
    switch (role) {
      case Role.user: {
        role$ = Role.admin;
        break;
      }
      case Role.admin: {
        role$ = Role.master;
        break;
      }
      case Role.master: {
        role$ = Role.user;
        break;
      }
    }
    const upgrade = await ProfileModuleController.upgradeRole(
      token,
      details.id,
      { toast: toast, options: toastConfigs }
    );
    if (upgrade) setRole(role$);
  };
  const init = () => {};
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const changeStatusIsEdit = () => {
    if (!isEdit) {
      setDetailsBackup(details);
    }
    setIsEdit(!isEdit);
  };
  const handleSave = async () => {
    if (
      (details.address.length > 0 &&
        Number.isNaN(details.age) === false &&
        details.avatar.length > 0 &&
        details.firstName.length > 0 &&
        details.lastName.length > 0) === false
    ) {
      toast.warn(
        "Các ô giá trị (địa chỉ, tuổi, link ảnh đại diện,tên họ đệm,tên) không được trống",
        toastConfigs
      );
      return;
    }
    const re1 = await ProfileModuleController.updateProfileForMaster(
      details,
      { toast: toast, options: toastConfigs },
      token,
    );
    if (re1) {
      setDetailsBackup(details);
    } else {
      setDetails(detailsBackup);
    }
    setIsEdit(!isEdit);
  };
  const handleCancelEdit = () => {
    setIsEdit(!isEdit);
    setDetails(detailsBackup);
  };
  const handleDelete = async () => {
    handleDeleteItem(details.id);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <tr>
      <td className={`${isEdit ? "bg-color3 text-white" : ""}`}>
        {details.id}
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <input
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          type="text"
          value={details.firstName}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, firstName: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <input
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          type="text"
          value={details.lastName}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, lastName: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <input
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          type="number"
          value={details.age}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, age: parseInt(e.target.value) });
          }}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <select
          className={`${isEdit ? " bg-color1 text-white outline-none" : ""}`}
          disabled={!isEdit}
          value={details.sex}
          onChange={(e: any) => {
            setDetails({ ...details, sex: e.target.value });
          }}
        >
          <option value={ESex.female}>Nữ</option>
          <option value={ESex.male}>Nam</option>
        </select>
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <input
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          type="email"
          value={details.email}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, email: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <input
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          type="tel"
          value={details.phoneNumber}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, phoneNumber: e.target.value });
          }}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <input
          className={`${isEdit ? " bg-color1 text-white" : ""}`}
          type="url"
          value={details.avatar}
          disabled={!isEdit}
          onChange={(e) => {
            setDetails({ ...details, avatar: e.target.value });
          }}
        />
      </td>
      <td className={``}>
        {detailsWork.position??'🔒'}
      </td>
      <td className={``}>
        {detailsWork.member_of_organization??'🔒'}
      </td>
      <td className={``}>
        {detailsWork.areas_of_expertise??'🔒'}
      </td>
      <td className={``}>
        {detailsWork.bio??'🔒'}
      </td>
      <td className="space-y-1 relative">
        <button
          className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded flex flex-col justify-center items-center p-3 ${
            role === Role.user
              ? "bg-color2 text-color7"
              : `${
                  role === Role.master
                    ? "bg-color6 text-color4"
                    : "bg-color5 text-color2"
                }`
          }`}
          onClick={upgradeRole}
        >
          {role === Role.admin && icons.doctor}
          {role === Role.user && icons.user}
          {role === Role.master && icons.master}
          <span className="font-3">{role.toUpperCase()}</span>
        </button>
      </td>
      <td className="space-y-1 p-1">
        {isEdit ? (
          <>
            <div>
              <Button
                variant="contained"
                color="primary"
                className="w-full"
                onClick={changeDialogEdit}
              >
                {icons.check}
                <span className="font-3">Lưu</span>
              </Button>
              <Dialog
                open={openDialogEdit}
                onClose={changeDialogEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <span className="font-3">
                    {"Bạn có chắc chắn muốn lưu chỉnh sửa này không?"}
                  </span>
                </DialogTitle>
                <DialogActions>
                  <Button onClick={changeDialogEdit} color="secondary">
                    <span className="font-3">Hủy</span>
                  </Button>
                  <Button onClick={handleSave} color="primary" autoFocus>
                    <span className="font-3">Đồng ý</span>
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <Button
              variant="contained"
              color="secondary"
              className="w-full"
              onClick={handleCancelEdit}
            >
              {icons.close}
              <span className="font-3">Hủy</span>
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              className="w-full"
              onClick={changeStatusIsEdit}
            >
              {icons.edit}
              <span className="font-3">Sửa</span>
            </Button>
            <div>
              <Button
                variant="contained"
                color="secondary"
                className="w-full"
                onClick={changeDialogDelete}
              >
                {icons.close}
                <span className="font-3">Xóa</span>
              </Button>
              <Dialog
                open={openDialogDelete}
                onClose={changeDialogDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <span className="font-3">
                    {"Bạn có chắc chắn muốn xóa không?"}
                  </span>
                </DialogTitle>
                <DialogActions>
                  <Button onClick={changeDialogDelete} color="secondary">
                    <span className="font-3">Hủy</span>
                  </Button>
                  <Button onClick={handleDelete} color="primary" autoFocus>
                    <span className="font-3">Đồng ý</span>
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </>
        )}
      </td>
    </tr>
  );
};
export default AccountsUser;
