/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileModuleController } from "../../admin/profile/profile.controller";
import { useSelector } from "react-redux";
import { EditUserServiceModuleController } from "../../admin/edit-info/edit-info.controller";
import Page404 from "../../errors/404";
import Booking from "./booking";

const DetailsAdmin: React.FC = () => {
  const userCurrent = useSelector(
    (state: any) => state.authReducer?.userCurrent
  );
  const token = useSelector((state: any) => state.authReducer?.accessToken);
  const [uService, setUService] = useState<any[]>([]);
  const params = useParams();
  const [details, setDetails] = useState<any>(null);
  const init = async () => {
    const dels = await ProfileModuleController.findAccountsForAdminById(
      parseInt(params.id + "")
    );
    setDetails(dels);
    if (dels) {
      let uS = await EditUserServiceModuleController.getAdminAndServiceForAd(
        parseInt(params.id + "")
      );

      uS = uS.map((item: any) => {
        return {
          service: item.service,
          id: item.id,
        };
      });
      setUService(uS);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return details ? (
    <div className="bg-gray-100 pt-12 md:pt-0">
      <div className="w-full h-full text-white ">
        <div className="container mx-auto p-5">
          <div className="md:flex no-wrap">
            <div className="w-full md:flex-1 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-color6 flex flex-col items-center space-y-1">
                <div className="image overflow-hidden h-48 md:w-[30rem] md:h-[30rem] w-48">
                  <img
                    className="h-48 w-48 md:w-[26rem] md:h-[26rem] mx-auto object-cover rounded-full"
                    src={details?.avatar}
                    alt={details?.firstName}
                  />
                </div>
                <h1 className="text-color2 font-bold text-3xl font-6  leading-8 ">
                  {details?.firstName} {details?.lastName}
                </h1>
                <div className="text-gray-600 font-lg text-semibold leading-6 flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:space-x-1">
                  <Booking
                    admin_id={parseInt(params.id + "")}
                    token={token}
                    uService={uService}
                    user_id={userCurrent?.id}
                  />
                </div>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  <div dangerouslySetInnerHTML={{ __html: details?.bio }}></div>
                </p>
              </div>
            </div>
            <div className="w-full md:basis-2/5 md:mx-2">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">Thông tin cá nhân</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Họ đệm</div>
                      <div className="px-4 py-2">{details?.firstName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Tên</div>
                      <div className="px-4 py-2">{details?.firstName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Giới tính</div>
                      <div className="px-4 py-2">
                        {details?.sex === "male" ? "Nam" : "Nữ"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Số điện thoại
                      </div>
                      <div className="px-4 py-2">{details?.phoneNumber}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Địa chỉ</div>
                      <div className="px-4 py-2">{details?.address}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Nơi làm việc
                      </div>
                      <div className="px-4 py-2">{details?.branch?.name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800"
                          href="mailto:jane@example.com"
                        >
                          {details?.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Vai trò hệ thống
                      </div>
                      <div className="px-4 py-2 uppercase">{details?.role}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4"></div>
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">Thông tin công việc</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Chuyên ngành
                      </div>
                      <div className="px-4 py-2">
                        {details?.areas_of_expertise ?? "Chưa cập nhật"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Chức vụ</div>
                      <div className="px-4 py-2">
                        {details?.position ?? "Chưa cập nhật"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Thành viên của tổ chức
                      </div>
                      <div className="px-4 py-2">
                        {details?.member_of_organization ?? "Chưa cập nhật"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Chi nhánh trực thuộc
                      </div>
                      <div className="px-4 py-2">
                        {details?.branch?.name ?? "Chưa cập nhật"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Khoa trực thuộc
                      </div>
                      <div className="px-4 py-2">
                        {details?.department?.name ?? "Chưa cập nhật"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Page404 />
  );
};
export default DetailsAdmin;
