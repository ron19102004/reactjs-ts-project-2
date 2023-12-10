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
            <h1 className="font-3 text-xl text-center text-color2">
              DANH SÁCH CHUYÊN KHOA
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
            <ul className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:mx-32">
              {list.map((item: any, index: number) => {
                return (
                  <li
                    key={index}
                    className=" shadow-md hover:shadow-lg rounded-2xl p-4 space-y-2 flex flex-col justify-center items-center"
                  >
                    <button
                      className="flex flex-col items-center justify-center rounded-full"
                      onClick={() => {
                        displayDetails(item);
                      }}
                    >
                      <img
                        src={item.avatar}
                        alt=""
                        className="w-32 h-32 object-cover rounded-full cursor-pointer shadow hover:shadow-md border-2"
                      />
                    </button>
                    <h1 className="text-center font-3 text-color2">
                      {item.name}
                    </h1>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>
      )}
      {openDetails && (
        <main className="space-y-3 px-3 md:px-10 pb-10">
          <section className="relative">
            <button
              className="flex space-x-2 items-center absolute top-0 left-0"
              onClick={back}
            >
              <span>{icons.back}</span>
              <span className="font-3 text-red-500 underline">Quay lại</span>
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
              className={`font-2 text-ellipsis ${
                statusInfo.moreInfoIntro ? "" : "line-clamp-3"
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
                  {" "}
                  Xem thêm
                </span>
              ) : (
                <span
                  className="underline"
                  onClick={() => {
                    setStatusInfo({ ...statusInfo, moreInfoIntro: false });
                  }}
                >
                  {" "}
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
              className={`font-2 text-ellipsis ${
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
                  {" "}
                  Xem thêm
                </span>
              ) : (
                <span
                  className="underline"
                  onClick={() => {
                    setStatusInfo({ ...statusInfo, moreInfoEquip: false });
                  }}
                >
                  {" "}
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
              className={`font-2 text-ellipsis ${
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
                  {" "}
                  Xem thêm
                </span>
              ) : (
                <span
                  className="underline"
                  onClick={() => {
                    setStatusInfo({ ...statusInfo, moreInfoProcess: false });
                  }}
                >
                  {" "}
                  Thu gọn
                </span>
              )}
            </p>
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
        </main>
      )}
      <Divider />
      <section className="p-3 pb-0">
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
        <p className={`${sttDes ? "" : "line-clamp-3"} text-ellipsis font-2`}>
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
          <span className="underline">Giá:</span> {value.price}kVNĐ
        </span>
      </section>
    </div>
  );
};
export default DepartmentPage;
