/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "@material-ui/core";
import qc from "../../../assets/chuyen-khoa-benh-vien-tam-anh.jpg";
import { Suspense, lazy, useEffect, useState } from "react";
import {
  EditDepartmentModuleController,
  EditServiceModuleController,
} from "../../admin/edit-info/edit-info.controller";
import introduceIcon from "../../../assets/presentation.png";
import processIcon from "../../../assets/process.png";
import equipmentIcon from "../../../assets/equipment.png";
import { Loading } from "../../admin/my-booking";
import backIcon from "../../../assets/back.png";
import { NavLink } from "react-router-dom";
import { ValidatorCustomModule } from "../../../helpers/validator";
const InfoBranch = lazy(() => import("../../../components/info-branch"));
const icons = {
  intro: <img src={introduceIcon} alt="intro" className="w-6 h-6" />,
  process: <img src={processIcon} alt="process" className="w-6 h-6" />,
  equipment: <img src={equipmentIcon} alt="equipment" className="w-6 h-6" />,
  back: <img src={backIcon} alt="back" className="w-6 h-6" />,
};
const DepartmentPage: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [listService, setService] = useState<any[]>([]);
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [listViewDetails, setListViewDetails] = useState<{
    department: any;
    listService: any[];
  }>({
    department: null,
    listService: [],
  });
  const [statusInfo, setStatusInfo] = useState<{
    moreInfoIntro: boolean;
    moreInfoEquip: boolean;
    moreInfoProcess: boolean;
  }>({
    moreInfoEquip: false,
    moreInfoIntro: false,
    moreInfoProcess: false,
  });
  const changeStatusOpenDetails = () => {
    setOpenDetails(!openDetails);
  };
  const init = async () => {
    const services = await EditServiceModuleController.getService();
    const ls = await EditDepartmentModuleController.getDepartment();
    setList(ls);
    setService(services);
  };
  const back = () => {
    changeStatusOpenDetails();
    setListViewDetails({
      department: null,
      listService: [],
    });
    setStatusInfo({
      moreInfoEquip: false,
      moreInfoIntro: false,
      moreInfoProcess: false,
    });
  };
  const displayDetails = (department: any) => {
    changeStatusOpenDetails();
    const listService$: any[] = listService.filter(
      (x) => x?.department?.id + "" === department.id + ""
    );
    setListViewDetails({
      department: department,
      listService: listService$,
    });
  };
  const objectHtmlEquipment = {
    __html: listViewDetails.department?.equipment_system,
  };
  const objectHtmlDescription = {
    __html: listViewDetails.department?.description,
  };
  const objectHtmlTreatmentTech = {
    __html: listViewDetails.department?.treatment_techniques,
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <article className="top-0 pt-11 md:pt-0 space-y-3">
      <div>
        <img src={qc} alt="" className="w-full" />
      </div>
      {!openDetails && (
        <main className="space-y-3">
          <section>
            <h1 className="font-6 font-semibold text-xl md:text-3xl text-center text-color2">
              Dánh sách chuyên khoa
            </h1>
            <div className="flex flex-col items-center">
              <Divider
                style={{
                  backgroundColor: "#53599A",
                  height: "2px",
                }}
                className="w-[50%]"
              />
            </div>
          </section>
          <section className="p-5 lg:p-10">
            <ul className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:mx-32 max-h-screen overflow-auto">
              {list.map((item: any, index: number) => {
                return (
                  <li
                    key={index}
                    // className=" shadow-md hover:shadow-lg rounded-2xl p-4 space-y-2 flex flex-col justify-center items-center"
                  >
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-5">
                      <div className="flex flex-col items-center">
                        <img
                          src={item.avatar}
                          alt=""
                          className="w-32 h-32 object-cover rounded-full cursor-pointer shadow hover:shadow-md border-2"
                        />
                        <h5 className="font-3  font-medium text-color2 ">
                          {item.name}
                        </h5>
                        <div className="flex">
                          <button
                            onClick={() => {
                              displayDetails(item);
                            }}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                          >
                            Chi tiêt
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>
      )}
      {openDetails && (
        <main className="font-sans space-y-3 px-3 md:px-10 pb-10">
          <section className="">
            <button
              className="text-color1 flex space-x-1 items-center top-0 left-0"
              onClick={back}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              <span className="underline">Quay lại</span>
            </button>
            <h1 className="font-3 text-xl text-center text-color2">
              {listViewDetails.department?.name.toUpperCase()}
            </h1>
          </section>
          <section>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span>{icons.intro}</span>
                <span className="font-3 text-color1">Thông tin giới thiệu</span>
              </div>
              <Divider />
            </div>
            <p
              className={`font-sans text-ellipsis ${
                statusInfo.moreInfoIntro ? "" : "line-clamp-6"
              }`}
            >
              <div dangerouslySetInnerHTML={objectHtmlDescription}></div>
            </p>
            <p className="float-right">
              {!statusInfo.moreInfoIntro ? (
                <span
                  className="underline"
                  onClick={() => {
                    setStatusInfo({ ...statusInfo, moreInfoIntro: true });
                  }}
                >
                  Xem thêm
                </span>
              ) : (
                <span
                  className="underline"
                  onClick={() => {
                    setStatusInfo({ ...statusInfo, moreInfoIntro: false });
                  }}
                >
                  Thu gọn
                </span>
              )}
            </p>
          </section>
          <section>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span>{icons.equipment}</span>
                <span className="font-3 text-color1">Thiết bị</span>
              </div>
              <Divider />
            </div>
            <p
              className={`font-sans text-ellipsis ${
                statusInfo.moreInfoEquip ? "" : "line-clamp-3"
              }`}
            >
              <div dangerouslySetInnerHTML={objectHtmlEquipment}></div>
            </p>
            <p className="float-right">
              {!statusInfo.moreInfoEquip ? (
                <span
                  className="underline"
                  onClick={() => {
                    setStatusInfo({ ...statusInfo, moreInfoEquip: true });
                  }}
                >
                  Xem thêm
                </span>
              ) : (
                <span
                  className="underline"
                  onClick={() => {
                    setStatusInfo({ ...statusInfo, moreInfoEquip: false });
                  }}
                >
                  Thu gọn
                </span>
              )}
            </p>
          </section>
          <section>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span>{icons.process}</span>
                <span className="font-3 text-color1">Kĩ thuật điều trị</span>
              </div>
              <Divider />
            </div>
            <p
              className={`font-sans text-ellipsis ${
                statusInfo.moreInfoProcess ? "" : "line-clamp-3"
              }`}
            >
              <div dangerouslySetInnerHTML={objectHtmlTreatmentTech}></div>
            </p>
            <p className="float-right">
              {!statusInfo.moreInfoProcess ? (
                <span
                  className="underline"
                  onClick={() => {
                    setStatusInfo({ ...statusInfo, moreInfoProcess: true });
                  }}
                >
                  Xem thêm
                </span>
              ) : (
                <span
                  className="underline"
                  onClick={() => {
                    setStatusInfo({ ...statusInfo, moreInfoProcess: false });
                  }}
                >
                  Thu gọn
                </span>
              )}
            </p>
          </section>
          <section>
            <img
              src={listViewDetails.department.avatar}
              alt="avatar"
              className="rounded-md md:h-96 md:w-screen md:object-cover ring-1"
            />
          </section>
          <section>
            <h1 className="font-3 text-xl text-color2">Các dịch vụ của khoa</h1>
            <Divider />
          </section>
          {listViewDetails.listService.length === 0 ? (
            <div>
              <h1>Chưa cập nhật</h1>
            </div>
          ) : (
            <section>
              <ul>
                {listViewDetails.listService.map(
                  (value: any, index: number) => {
                    return (
                      <li key={index}>
                        <CardService index={index} value={value} />
                      </li>
                    );
                  }
                )}
              </ul>
            </section>
          )}
          <button
            className="text-color1 flex space-x-1 items-center top-0 left-0"
            onClick={back}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            <span className="underline">Quay lại chuyên khoa</span>
          </button>
          <NavLink
            to={"/"}
            className="text-color1 flex space-x-1 items-center top-0 left-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span className="underline">Về trang chủ</span>
          </NavLink>
        </main>
      )}
      <Divider />
      <section className="p-3 pb-5">
        <Suspense fallback={<Loading />}>
          <InfoBranch />
        </Suspense>
      </section>
    </article>
  );
};
const CardService: React.FC<{
  value: any;
  index: number;
}> = ({ index, value }) => {
  const [sttDes, setSttDes] = useState<boolean>(false);
  const obHtmlDescription = { __html: value?.description };
  return (
    <div>
      <h1 className="font-3 text-color1 text-lg">
        {index + 1}-{value.name}
      </h1>
      <section>
        <span className="font-3 text-color2 underline">Mô tả:</span>
        <p
          className={`${sttDes ? "" : "line-clamp-3"} text-ellipsis font-sans`}
        >
          <div dangerouslySetInnerHTML={obHtmlDescription}></div>
        </p>
        <p className="float-right">
          {!sttDes ? (
            <span
              className="underline"
              onClick={() => {
                setSttDes(true);
              }}
            >
              {" "}
              Xem thêm
            </span>
          ) : (
            <span
              className="underline"
              onClick={() => {
                setSttDes(false);
              }}
            >
              {" "}
              Thu gọn
            </span>
          )}
        </p>
      </section>
      <section>
        <span className="font-3 text-color2">
          <span className="underline">Giá:</span>{" "}
          {ValidatorCustomModule.convertCurrencyStringToNumber(
            `${value.price}.000kVNĐ`
          )}
        </span>
      </section>
    </div>
  );
};
export default DepartmentPage;
