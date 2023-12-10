/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import editIcon from "../../../assets/edit.png";
import checkedIcon from "../../../assets/checked.png";
import closeIcon from "../../../assets/reject.png";
import doctorIcon from "../../../assets/doctor.png";
import masterIcon from "../../../assets/master.png";
import userIcon from "../../../assets/user.png";
import refreshIcon from "../../../assets/refresh.png";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { ToastOptions, toast } from "react-toastify";
import { ProfileModuleController } from "./profile.controller";
import { ESex } from "./my-profile";
import { Role } from "../../../redux/reducers/auth.reducer";
import {
  EditBranchModuleController,
  EditDepartmentModuleController,
} from "../edit-info/edit-info.controller";
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
const AccountsAdmin: React.FC<IAccountsProps> = ({ admin_id, token }) => {
  const [list, setList] = useState<any[]>([]);
  const [listDepartment, setDepartments] = useState<any[]>([]);
  const [listBranch, setBranches] = useState<any[]>([]);
  const init = async () => {
    const response = await ProfileModuleController.findAllAccountsForAdmin();
    setList(response);
    const dep = await EditDepartmentModuleController.getDepartment();
    setDepartments(dep);
    const bra = await EditBranchModuleController.getBranches();
    setBranches(bra);
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
        <h1 className="font-3 xl:text-2xl text-lg text-color2 pointer-events-none ">
          Các tài khoản quản lý
        </h1>
      </section>
      <section className="overflow-x-auto w-full overflow-y-auto max-h-screen">
        <table className="branches-table min-w-full">
          <thead className="bg-color2 text-color7">
            <tr className="font-3">
              <th className="">Mã tài khoản (UID) </th>
              <th className="">Mã-Tên chi nhánh (CID) </th>
              <th className="">Mã-Tên khoa (KID) </th>
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
                    listBranches={listBranch}
                    listDepartments={listDepartment}
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
export interface IDetailsRelationship {
  id: number;
  branch_id: number;
  department_id: number;
}
const EditRowAccount: React.FC<{
  item: any;
  admin_id: number;
  token: string;
  handleDeleteItem: (id: number) => void;
  listDepartments: any[];
  listBranches: any[];
}> = ({
  admin_id,
  item,
  token,
  handleDeleteItem,
  listBranches,
  listDepartments,
}) => {
  const [listDepartmentView, setListDepartmentView] = useState<any[]>([]);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const changeDialogDelete = () => {
    setOpenDialogDelete(!openDialogDelete);
  };
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const changeDialogEdit = () => {
    setOpenDialogEdit(!openDialogEdit);
  };
  const filterDepartmentByBranches = (branch_id: number) => {
    let listCopy = [...listDepartments];
    listCopy = listCopy.filter((x) => {
      return x?.branch?.id + "" === branch_id + "";
    });
    setListDepartmentView(listCopy);
  };
  const [listDependencies, setListDependencies] = useState<{
    department: any;
    branch: any;
  }>({
    department: item?.department,
    branch: item?.branch,
  });
  const [detailsRelationship, setDetailsRelationship] =
    useState<IDetailsRelationship>({
      branch_id: item?.branch?.id,
      id: item?.id,
      department_id: item?.department?.id,
    });
  const [detailsRelationshipBackup, setDetailsRelationshipBackup] =
    useState<IDetailsRelationship>({
      branch_id: item?.branch?.id,
      id: item?.id,
      department_id: item?.department?.id,
    });
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
  const [detailsWork, setDetailsWork] = useState<IDetailsWork>({
    areas_of_expertise: item?.areas_of_expertise,
    bio: item?.bio,
    member_of_organization: item?.member_of_organization,
    position: item?.position,
    id: item?.id,
  });
  const [detailsWorkBackup, setDetailsWorkBackup] = useState<IDetailsWork>({
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
      setDetailsWorkBackup(detailsWork);
      setDetailsRelationshipBackup(detailsRelationship);
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
      token
    );
    const re2 = await ProfileModuleController.updateInfoWorkForMaster(
      detailsWork,
      { toast: toast, options: toastConfigs },
      token
    );
    const re3 = await ProfileModuleController.updateDepartmentBranch(
      detailsRelationship,
      { toast: toast, options: toastConfigs },
      token
    );
    if (re1) {
      setDetailsBackup(details);
    } else {
      setDetails(detailsBackup);
    }
    if (re2) {
      setDetailsWorkBackup(detailsWork);
    } else {
      setDetailsWork(detailsWorkBackup);
    }
    if (re3) {
      const indexDep = listDepartments.findIndex(
        (x) => x.id === detailsRelationship.department_id
      );
      const indexBra = listBranches.findIndex(
        (x) => x.id === detailsRelationship.branch_id
      );
      setListDependencies({
        branch: listBranches[indexBra],
        department: listDepartments[indexDep],
      });
      setDetailsRelationshipBackup(detailsRelationship);
    } else {
      setDetailsRelationship(detailsRelationshipBackup);
    }
    setIsEdit(!isEdit);
  };
  const handleCancelEdit = () => {
    setIsEdit(!isEdit);
    setDetails(detailsBackup);
    setDetailsWork(detailsWorkBackup);
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
        {!isEdit && (
          <span>
            {listDependencies.branch?.id
              ? `${listDependencies.branch?.id}-${listDependencies.branch?.name}`
              : `Chưa có`}
          </span>
        )}
        {isEdit && (
          <select
            className={`outline-none ${isEdit ? " bg-color1 text-white " : ""}`}
            onChange={(e) => {
              setDetailsRelationship({
                ...detailsRelationship,
                branch_id: parseInt(e.target.value),
              });
              filterDepartmentByBranches(parseInt(e.target.value));
            }}
          >
            <option value="0">Chọn chi nhánh</option>
            {listBranches &&
              listBranches.map((item: any, index: number) => {
                return (
                  <option value={item.id} key={index}>
                    c{item.id}id-{item.name}
                  </option>
                );
              })}
          </select>
        )}
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        {!isEdit && (
          <span>
            {" "}
            {listDependencies.department?.id
              ? `${listDependencies.department?.id}-${listDependencies.department?.name}`
              : `Chưa có`}
          </span>
        )}
        {isEdit && (
          <select
            className={`outline-none ${
              isEdit ? " bg-color1 text-white x" : ""
            }`}
            onChange={(e) => {
              setDetailsRelationship({
                ...detailsRelationship,
                department_id: parseInt(e.target.value),
              });
            }}
          >
            <option value="0">Chọn khoa</option>
            {listDepartmentView &&
              listDepartmentView.map((item: any, index: number) => {
                return (
                  <option value={item.id} key={index}>
                    k{item.id}id-{item.name}
                  </option>
                );
              })}
          </select>
        )}
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
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <input
          className={`p-2 ${
            isEdit ? " bg-color1 text-white outline-none" : ""
          }`}
          type="text"
          value={detailsWork.position}
          disabled={!isEdit}
          onChange={(e) => {
            setDetailsWork({ ...detailsWork, position: e.target.value });
          }}
          placeholder={detailsWork.position ? "" : "Chưa có"}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <input
          className={`p-2 ${
            isEdit ? " bg-color1 text-white outline-none" : ""
          }`}
          type="text"
          value={detailsWork.member_of_organization}
          disabled={!isEdit}
          onChange={(e) => {
            setDetailsWork({
              ...detailsWork,
              member_of_organization: e.target.value,
            });
          }}
          placeholder={detailsWork.member_of_organization ? "" : "Chưa có"}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <input
          type="text"
          className={`p-2 ${
            isEdit ? " bg-color1 text-white outline-none" : ""
          }`}
          value={detailsWork.areas_of_expertise}
          disabled={!isEdit}
          onChange={(e) => {
            setDetailsWork({
              ...detailsWork,
              areas_of_expertise: e.target.value,
            });
          }}
          placeholder={detailsWork.areas_of_expertise ? "" : "Chưa có"}
        />
      </td>
      <td className={`${isEdit ? " bg-color1 text-white" : ""}`}>
        <textarea
          className={`p-2 ${
            isEdit ? " bg-color1 text-white outline-none" : ""
          }`}
          value={detailsWork.bio}
          disabled={!isEdit}
          onChange={(e) => {
            setDetailsWork({ ...detailsWork, bio: e.target.value });
          }}
          placeholder={detailsWork.bio ? "" : "Chưa có"}
        />
      </td>
      <td className="space-y-1 relative">
        <button
          disabled={details.id === admin_id}
          className={`rounded absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center p-3 ${
            role === Role.user
              ? "bg-color2 text-color7"
              : `${
                  role === Role.master
                    ? `${
                        details.id === admin_id ? "bg-red-500" : "bg-color6"
                      } text-color4 `
                    : "bg-color5 text-color2"
                }`
          }`}
          onClick={upgradeRole}
        >
          {role === Role.admin && icons.doctor}
          {role === Role.user && icons.user}
          {role === Role.master && icons.master}
          <span className={`font-3 ${role === Role.master && "text-sm"}`}>
            {role.toUpperCase()}
          </span>
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
                disabled={details.id === admin_id}
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
export default AccountsAdmin;
