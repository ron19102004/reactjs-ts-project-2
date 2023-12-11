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
      <h1 className="font-3 text-color2 text-center text-lg md:text-2xl">
        LIÊN HỆ VỚI CHÚNG TÔI
      </h1>
      <ul className="grid gap-10 grid-cols-1 lg:grid-cols-2 md:px-28 max-h-screen overflow-y-auto pb-8 px-2">
        {list &&
          list.map((branch: any, index: number) => {
            return (
              <li
                key={index}
                className="md:flex md:space-x-2  shadow-lg hover:shadow-xl rounded-3xl p-2 "
              >
                <div className="rounded-3xl md:basis-4/5">
                  <iframe
                    className="w-full h-[300px] rounded-3xl"
                    src={branch?.src_map}
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="font-sans space-y-2 pb-3 md:pb-0">
                  <h1 className="font-3 text-center text-color2 text-xl">
                    {branch?.name}
                  </h1>
                  <div className="font-2">
                    <h1>
                      <span className="text-color1">Đường dây nóng:</span>{" "}
                      {branch?.hotline}
                    </h1>
                    <h1>
                      <span className="text-color1">Email:</span>{" "}
                      {branch?.email}
                    </h1>
                    <h1>
                      <span className="text-color1">Ngày thành lập: </span>
                      {branch?.establish_at.split("-").reverse().join("-")}
                    </h1>
                    <h1>
                      <span className="text-color1">Mô tả: </span>
                      {branch?.description && branch?.description.length > 0
                        ? branch?.description
                        : "Chưa có"}
                    </h1>
                    <h1>
                      <span className="text-color1">Địa chỉ:</span>{" "}
                      {branch?.address}
                    </h1>
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
