/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "@material-ui/core";
import qc from "../../../assets/chuyen-khoa-benh-vien-tam-anh.jpg";
import { useEffect, useState } from "react";
import { EditDepartmentModuleController } from "../../admin/edit-info/edit-info.controller";
const DepartmentPage: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const init = async () => {
    const ls = await EditDepartmentModuleController.getDepartment();
    setList(ls);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <article className="top-0 pt-11 md:pt-0 space-y-3">
      <div>
        <img src={qc} alt="" className="w-full" />
      </div>
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
                <li key={index} className=" shadow-md hover:shadow-lg rounded-2xl p-4 space-y-2">
                  <div className="flex flex-col items-center justify-center rounded-full">
                    <img
                      src={item.avatar}
                      alt=""
                      className="w-32 h-32 object-cover rounded-full cursor-pointer shadow hover:shadow-md border-2"
                    />
                  </div>
                  <h1 className="text-center font-3 text-color2">
                    {item.name}
                  </h1>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </article>
  );
};
export default DepartmentPage;
