/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, lazy, useEffect, useState } from "react";
import { ProfileModuleController } from "../../admin/profile/profile.controller";
import {
  EditServiceModuleController,
  EditUserServiceModuleController,
} from "../../admin/edit-info/edit-info.controller";
import Booking from "./booking";
import { Divider, Tooltip } from "@material-ui/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ToastOptions, toast } from "react-toastify";
import { Loading } from "../../admin/my-booking";
import { NAME_SYSTEM } from "../../../helpers/constant";
import { NavLink } from "react-router-dom";
const InfoBranch = lazy(() => import("../../../components/info-branch"));

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
    take: 8,
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
  const [isFillter, setIsFillter] = useState<boolean>(false);
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
    setIsFillter(true);
  };
  const cancelFilter = () => {
    setListViewInfo(listViewInfoBackup);
    setValueFilter(0);
    setIsFillter(false);
  };
  return (
    <>
      <section className="space-y-3">
        <h1 className=" text-color2 font-6 font-semibold text-2xl md:text-3xl text-center">
          Đội ngũ các bác sĩ bệnh viện {NAME_SYSTEM}
        </h1>
        <section className="xl:px-7 px-2 flex flex-col md:flex-row md:items-center md:space-x-3 md:space-y-0 space-y-3">
          <h1
            className="font-6 font-semibold text-xl text-color6 cursor-pointer "
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
              className={`font-6 text-color2 h-10 px-2 rounded-md outline-none focus:right-2 border-2`}
              onChange={(e) => {
                setValueFilter(parseInt(e.target.value));
              }}
              value={valueFilter}
            >
              <option value="0">Chọn dịch vụ</option>
              {services &&
                services.map((item: any, index: number) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
            </select>
            {!isFillter && (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={filter}
              >
                Lọc
              </button>
            )}
            {isFillter && (
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={cancelFilter}
              >
                Hủy lọc
              </button>
            )}
          </section>
        </section>
        <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-screen overflow-y-auto">
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
                  <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow p-5">
                    <div className="flex flex-col items-center justify-between h-full">
                      <div className="flex flex-col items-center">
                        <img
                          className="w-24 h-24 rounded-full shadow-lg object-cover"
                          src={item.infoAdmin?.avatar}
                          alt={item.infoAdmin?.avatar}
                        />
                        <h5 className="mb-1 font-7 text-color2 text-xl font-medium ">
                          {item.infoAdmin?.firstName} {item.infoAdmin?.lastName}
                        </h5>
                        <span className="text-sm text-gray-500">
                          {item.infoAdmin?.position}
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center">
                        <Booking
                          admin_id={item.infoAdmin.id}
                          uService={item.uServices}
                          token={token}
                          user_id={user_id}
                        />

                        <NavLink
                          className="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                          to={`/booking/details/${item.infoAdmin.id}`}
                        >
                          Chi tiết
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  {/* <CardAdmin item={item} token={token} user_id={user_id} /> */}
                </li>
              );
            }
          )}
        </ul>
        <section className="flex flex-col justify-center items-center">
          {listViewInfo.length % nav.take === 0 && (
            <button
              className="bg-color5 text-color2 px-2 py-1 rounded hover:bg-color4 font-3 shadow hover:shadow-md"
              onClick={moreAdmin}
            >
              Xem thêm bác sĩ
            </button>
          )}
        </section>
        <Divider />
        <section className="py-3 pb-0">
          <Suspense fallback={<Loading />}>
            <InfoBranch />
          </Suspense>
        </section>
      </section>
    </>
  );
};
export default ListAdmin;
