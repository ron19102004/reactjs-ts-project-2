/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ProfileModuleController } from "../../admin/profile/profile.controller";
import {
  EditServiceModuleController,
  EditUserServiceModuleController,
} from "../../admin/edit-info/edit-info.controller";
import Booking from "./booking";
import { Button, Tooltip } from "@material-ui/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ToastOptions, toast } from "react-toastify";
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
interface IListAdminProps {
  user_id: number;
  token: string;
}
const ListAdmin: React.FC<IListAdminProps> = ({ token, user_id }) => {
  const [services, setServices] = useState<any[]>([]);
  const [nav, setNav] = useState<{ skip: number; take: number }>({
    skip: 0,
    take: 5,
  });
  const [listViewInfo, setListViewInfo] = useState<
    {
      infoAdmin: any;
      uServices: {
        id: number;
        service: any;
      }[];
    }[]
  >([]);
  const [listViewInfoBackup, setListViewInfoBackup] = useState<
    {
      infoAdmin: any;
      uServices: {
        id: number;
        service: any;
      }[];
    }[]
  >([]);
  const [listAdService, setListAdService] = useState<any[]>([]);
  const setUpListViewInfo = (listAdmin: any[], listAdminService: any[]) => {
    const listTerminal: {
      infoAdmin: any;
      uServices: any[];
    }[] = listAdmin.map((admin: any) => {
      let listUServiceOfAdmin = listAdminService.filter(
        (x) => x.admin.id + "" === admin.id + ""
      );
      listUServiceOfAdmin = listUServiceOfAdmin.map((x) => ({
        id: x.id,
        service: x.service,
      }));
      return {
        infoAdmin: admin,
        uServices: listUServiceOfAdmin,
      };
    });
    setListViewInfoBackup(listTerminal);
    return listTerminal;
  };
  const init = async (skip: number, take: number) => {
    const listService = await EditServiceModuleController.getService();
    const listAdService$ =
      await EditUserServiceModuleController.getAdminAndService();
    const listAd =
      await ProfileModuleController.findAllAccountsForAdminSkipTake(skip, take);
    setListAdService(listAdService$);
    setListViewInfo(setUpListViewInfo(listAd, listAdService$));
    setServices(listService);
  };
  useEffect(() => {
    init(nav.skip, nav.take);
  }, []);
  const moreAdmin = () => {
    init(nav.skip, nav.take + 5);
    setNav({ ...nav, take: nav.take + 5 });
  };
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [valueFilter, setValueFilter] = useState<number>(0);
  const filter = async () => {
    if (valueFilter === 0) {
      toast.warning("Vui lòng chọn dịch vụ", toastConfigs);
      return;
    }
    const listAd = await ProfileModuleController.findAllAccountsForAdmin();
    const listViewAll = setUpListViewInfo(listAd, listAdService);
    const result = listViewAll.filter(
      (value: { infoAdmin: any; uServices: any[] }) => {
        let has = false;
        for (let i = 0; i < value.uServices.length; i++) {
          if (value.uServices[i].service.id + "" === valueFilter + "") {
            has = true;
            break;
          }
        }
        return has;
      }
    );
    setListViewInfo(result);
  };
  const cancelFilter = () => {
    setListViewInfo(listViewInfoBackup);
    setValueFilter(0);
  };
  return (
    <>
      <section className="space-y-3">
        <h1 className="font-3 text-color2 font-2 text-2xl md:text-3xl text-center">
          Đội ngũ các bác sĩ bệnh viện Trang Dũng
        </h1>
        <section className="xl:px-7 px-2 flex flex-col md:flex-row md:items-center md:space-x-3 md:space-y-0 space-y-3">
          <h1
            className="font-3 text-xl text-color6 cursor-pointer "
            onClick={() => {
              setOpenFilter(!openFilter);
            }}
          >
            <span>Bộ lọc theo dịch vụ</span>
            <Tooltip title={`${openFilter ? "Đóng bộ lọc" : "Mở bộ lọc"}`}>
              <button className="text-color6 md:hidden">
                {openFilter ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </button>
            </Tooltip>
          </h1>
          <section
            className={`flex flex-col md:flex-row md:items-center md:space-x-3 md:space-y-0 space-y-3 ${
              openFilter ? "block" : "hidden md:block"
            }`}
          >
            <select
              className={`font-2 text-color2 h-10 px-2 rounded-md outline-none focus:right-2 border-2`}
              onChange={(e) => {
                setValueFilter(parseInt(e.target.value));
              }}
            >
              <option value="0">Chọn dịch vụ</option>
              {services &&
                services.map((item: any, index: number) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
            </select>
            <button
              className="bg-color5 h-10 text-color2 px-2 py-1 rounded hover:bg-color4 font-3 shadow hover:shadow-md"
              onClick={filter}
            >
              Lọc
            </button>
            <button
              className="bg-red-400 h-10 text-color5 px-2 py-1 rounded hover:bg-red-500 font-3 shadow hover:shadow-md"
              onClick={cancelFilter}
            >
              Hủy bộ lọc
            </button>
          </section>
        </section>
        <ul className="xl:space-y-10 xl:p-7 p-2 space-y-5">
          {listViewInfo.map(
            (
              item: {
                infoAdmin: any;
                uServices: {
                  id: number;
                  service: any;
                }[];
              },
              index: number
            ) => {
              return (
                <li key={index}>
                  <CardAdmin item={item} token={token} user_id={user_id} />
                </li>
              );
            }
          )}
        </ul>
        <section className="flex flex-col justify-center items-center">
          <button
            className="bg-color5 text-color2 px-2 py-1 rounded hover:bg-color4 font-3 shadow hover:shadow-md"
            onClick={moreAdmin}
          >
            Xem thêm bác sĩ
          </button>
        </section>
      </section>
    </>
  );
};
interface ICardAdminProps {
  item: {
    infoAdmin: any;
    uServices: {
      id: number;
      service: any;
    }[];
  };
  user_id: number;
  token: string;
}
const CardAdmin: React.FC<ICardAdminProps> = ({ item, token, user_id }) => {
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  return (
    <section className="shadow-lg hover:shadow-xl grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-3 rounded-xl">
      <section className="flex flex-col justify-center items-center transition-all space-y-1">
        <div className="overflow-hidden w-64 h-64 flex flex-col justify-center items-center rounded ">
          <img
            src={item.infoAdmin?.avatar}
            alt="avatar"
            className="w-64 h-64 overflow-hidden object-cover transition-all hover:scale-150 rounded"
          />
        </div>
        <h1 className="font-3 text-center text-color2 text-2xl xl:text-xl">
          {item?.infoAdmin?.position} {item.infoAdmin.firstName}{" "}
          {item.infoAdmin.lastName}
        </h1>
      </section>
      <div className=" rounded-md p-3 flex flex-col justify-between">
        <section>
          <h1 className="font-3 text-color1 text-2xl text-center">
            Thông tin cá nhân
          </h1>
          <h2 className="text-color2 font-2 text-lg ">
            Mã thông tin: {item.infoAdmin.id}
          </h2>
          <h2 className="text-color2 font-2 text-lg ">
            Email: {item.infoAdmin.email}
          </h2>
          <h2 className="text-color2 font-2 text-lg ">
            SĐT: {item.infoAdmin.phoneNumber}
          </h2>
          <h2 className="text-color2 font-2 text-lg ">
            Địa chỉ: {item.infoAdmin.address}
          </h2>
          <h2 className="text-color2 font-2 text-lg ">
            Tuổi: {item.infoAdmin.age}
          </h2>
          <h2 className="text-color2 font-2 text-lg ">
            Giới tính: {item.infoAdmin.sex}
          </h2>
        </section>
        {!openInfo && (
          <section className="flex justify-between items-center">
            <Booking
              admin_id={item.infoAdmin.id}
              uService={item.uServices}
              token={token}
              user_id={user_id}
              openInfo={openInfo}
            />
            <div className="lg:hidden">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenInfo(!openInfo);
                }}
              >
                <span className="font-3">Thêm thông tin</span>
              </Button>
            </div>
          </section>
        )}
      </div>
      <div
        className={`rounded-md p-3 ${
          openInfo ? "block lg:block" : "hidden lg:block"
        }`}
      >
        <h1 className="font-3 text-color1 text-2xl text-center">
          Trực thuộc chi nhánh - Khoa
        </h1>
        <h2 className="text-color2 font-2 text-lg ">
          Mã nhánh: {item.infoAdmin?.branch.id ?? "Chưa cập nhật"}
        </h2>
        <h2 className="text-color2 font-2 text-lg ">
          Mã khoa: {item.infoAdmin?.department.id ?? "Chưa cập nhật"}
        </h2>
        <h2 className="text-color2 font-2 text-lg ">
          Tên nhánh: {item.infoAdmin?.branch.name ?? "Chưa cập nhật"}
        </h2>
        <h2 className="text-color2 font-2 text-lg ">
          Tên khoa: {item.infoAdmin?.department.name ?? "Chưa cập nhật"}
        </h2>
        <h2 className="text-color2 font-2 text-lg ">
          Đường dây nóng: {item.infoAdmin?.branch.hotline ?? "Chưa cập nhật"}
        </h2>
        <h1 className="font-3 text-color1 text-2xl text-center">Các dịch vụ</h1>
        <ul className="list-decimal m-3">
          {item.uServices &&
            item.uServices.map((item: any, index: number) => {
              return (
                <li className="text-color2 font-2 text-lg " key={index}>
                  {item?.service.name}
                </li>
              );
            })}
        </ul>
      </div>
      <div
        className={`rounded-md p-3 ${
          openInfo ? "block lg:block" : "hidden lg:block"
        }`}
      >
        <h1 className="font-3 text-color1 text-2xl text-center">
          Thông tin công việc
        </h1>
        <h2 className="text-color2 font-2 text-lg ">
          Vị trí: {item.infoAdmin?.position ?? "Chưa cập nhật"}
        </h2>
        <h2 className="text-color2 font-2 text-lg ">
          Chuyên môn: {item.infoAdmin?.areas_of_expertise ?? "Chưa cập nhật"}
        </h2>
        <h2 className="text-color2 font-2 text-lg ">
          Tổ chức: {item.infoAdmin?.member_of_organization ?? "Chưa cập nhật"}
        </h2>
        <h2 className="text-color2 font-2 text-lg ">
          Mô tả:
          <textarea
            value={item.infoAdmin?.bio ?? "Chưa cập nhật"}
            disabled
            className="w-full h-56 lg:h-48 px-1 outline-none rounded bg-slate-100"
          ></textarea>
        </h2>
        {openInfo && (
          <section className="space-y-2">
            <Booking
              admin_id={item.infoAdmin.id}
              uService={item.uServices}
              token={token}
              user_id={user_id}
              openInfo={openInfo}
            />
            <div className="lg:hidden">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenInfo(!openInfo);
                }}
                className="w-full"
              >
                <span className="font-3">Thu gọn thông tin</span>
              </Button>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};
export default ListAdmin;
