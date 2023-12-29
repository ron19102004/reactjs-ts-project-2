/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { CompControllerModule } from "./controller";

const InfoBranch: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const init = async () => {
    const ls = await CompControllerModule.getBranches();
    setList(ls);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <section className="space-y-3">
      <h1 className="font-6 font-semibold text-color2 text-center text-xl md:text-3xl">
        Liên hệ với chúng tôi
      </h1>
      <ul className="container flex flex-col md:flex-row space-y-5 md:space-y-0 justify-center items-center md:space-x-5 max-h-screen overflow-auto">
        {list &&
          list.map((branch: any, index: number) => {
            return (
              <li
                key={index}
                className=""
              >
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                  <div>
                    <iframe
                      className="w-full h-[300px] rounded-t-lg"
                      src={branch?.src_map}
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="p-5">
                    <div className="font-sans space-y-2 pb-3 md:pb-0">
                      <h1 className="font-7 text-center text-color2 text-xl">
                        {branch?.name}
                      </h1>
                      <div className="font-6">
                        <h1>
                          <span className="text-color6">Đường dây nóng:</span>{" "}
                          {branch?.hotline}
                        </h1>
                        <h1>
                          <span className="text-color6">Email:</span>{" "}
                          {branch?.email}
                        </h1>
                        <h1>
                          <span className="text-color6">Ngày thành lập: </span>
                          {branch?.establish_at.split("-").reverse().join("-")}
                        </h1>
                        <h1>
                          <span className="text-color6">Mô tả: </span>
                          {branch?.description && branch?.description.length > 0
                            ? branch?.description
                            : "Chưa có"}
                        </h1>
                        <h1>
                          <span className="text-color6">Địa chỉ:</span>{" "}
                          {branch?.address}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
};
export default InfoBranch;
