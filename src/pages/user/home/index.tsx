/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, lazy } from "react";
import DoctorImg from "../../../assets/kisspng-physician-surgeon-medicine-stock-photography-5aff8f8d1f1519.0003837915266978691273.png";
import { IDepartment, ISpecialThing, departments, specialThings } from "./data";
import "./style.scss";
import { useSelector } from "react-redux";
import { Loading } from "../../admin/my-booking";
import { Divider, Tooltip } from "@material-ui/core";
import { NAME_SYSTEM } from "../../../helpers/constant";

const FeedBack = lazy(() => import("./feedback"));
const InfoBranch = lazy(() => import("../../../components/info-branch"));
const HomeUser: React.FC = () => {
  const userCurrent = useSelector(
    (state: any) => state.authReducer?.userCurrent
  );
  const token = useSelector((state: any) => state.authReducer?.accessToken);
  return (
    <article className={`top-0 font-3 space-y-5`}>
      <section
        className={`flex flex-col sm:flex-row sm:justify-center sm:items-center sm:space-x-20 bg-color2 min-h-screen px-5 sm:px-0`}
      >
        <div className={`md:relative`}>
          <section
            className={`xl:w-[450px] lg:w-[350px] md:w-[240px] sm:w-[180px] pt-12 md:pt-0`}
          >
            <svg
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              id="blobSvg"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "rgb(194, 229, 156)" }}
                  ></stop>
                  <stop
                    offset="100%"
                    style={{ stopColor: "rgb(4, 138, 129)" }}
                  ></stop>
                </linearGradient>
              </defs>
              <path fill="url(#gradient)">
                <animate
                  attributeName="d"
                  dur={"5000ms"}
                  repeatCount={"indefinite"}
                  values="M477.5,295Q467,340,441,377.5Q415,415,377,439.5Q339,464,294.5,471Q250,478,206,470.5Q162,463,121.5,441Q81,419,50,382.5Q19,346,13,298Q7,250,21.5,205.5Q36,161,63,125.5Q90,90,123.5,58Q157,26,203.5,25.5Q250,25,297.5,23Q345,21,378.5,54.5Q412,88,441,123.5Q470,159,479,204.5Q488,250,477.5,295Z;
                  
                  M474.5,294.5Q465,339,444,381Q423,423,382.5,448Q342,473,296,482.5Q250,492,206.5,475.5Q163,459,121,440Q79,421,60,379Q41,337,32.5,293.5Q24,250,31,206Q38,162,60.5,122.5Q83,83,122.5,60.5Q162,38,206,23.5Q250,9,294,23Q338,37,374.5,63Q411,89,445.5,122Q480,155,482,202.5Q484,250,474.5,294.5Z;
                  
                  M477.5,293.5Q461,337,441.5,379.5Q422,422,381,445Q340,468,295,476Q250,484,205,476Q160,468,123,441Q86,414,53.5,379.5Q21,345,21.5,297.5Q22,250,21.5,202.5Q21,155,51.5,118.5Q82,82,120.5,56Q159,30,204.5,27Q250,24,297,23.5Q344,23,380,53.5Q416,84,438.5,123.5Q461,163,477.5,206.5Q494,250,477.5,293.5Z;
                  
                  M482,297.5Q479,345,449.5,382.5Q420,420,382.5,450Q345,480,297.5,482Q250,484,207,471.5Q164,459,118.5,443Q73,427,49,385Q25,343,17,296.5Q9,250,16.5,203.5Q24,157,52,118.5Q80,80,118.5,53.5Q157,27,203.5,19Q250,11,294,24Q338,37,381.5,56Q425,75,451,115.5Q477,156,481,203Q485,250,482,297.5Z;
                  
                  M480.43522,295.41363Q469.61134,340.82726,444.28408,379.89204Q418.95682,418.95682,378.84885,441.65452Q338.74089,464.35223,294.37045,477.30567Q250,490.25911,202.30567,485.0614Q154.61134,479.86369,118.5,448.73751Q82.38866,417.61134,60.99662,377.17612Q39.60458,336.74089,28.47503,293.37045Q17.34548,250,25.88866,205.58637Q34.43184,161.17274,59.30229,122.67274Q84.17274,84.17274,119.54318,52.97841Q154.91363,21.78408,202.45682,11.69771Q250,1.61134,297.65115,10.96019Q345.30229,20.30905,380.97841,51.82726Q416.65452,83.34548,442.13293,121.75911Q467.61134,160.17274,479.43522,205.08637Q491.25911,250,480.43522,295.41363Z;
                  
                  M482,297.5Q479,345,449.5,382.5Q420,420,382.5,450Q345,480,297.5,482Q250,484,207,471.5Q164,459,118.5,443Q73,427,49,385Q25,343,17,296.5Q9,250,16.5,203.5Q24,157,52,118.5Q80,80,118.5,53.5Q157,27,203.5,19Q250,11,294,24Q338,37,381.5,56Q425,75,451,115.5Q477,156,481,203Q485,250,482,297.5Z;
                  
                  M477.5,293.5Q461,337,441.5,379.5Q422,422,381,445Q340,468,295,476Q250,484,205,476Q160,468,123,441Q86,414,53.5,379.5Q21,345,21.5,297.5Q22,250,21.5,202.5Q21,155,51.5,118.5Q82,82,120.5,56Q159,30,204.5,27Q250,24,297,23.5Q344,23,380,53.5Q416,84,438.5,123.5Q461,163,477.5,206.5Q494,250,477.5,293.5Z;"
                ></animate>
              </path>
            </svg>
          </section>
          <section className="absolute top-12 left-0 w-full">
            <img src={DoctorImg} alt="doctor" className={`w-[100%]`} />
          </section>
        </div>
        <div className="w-full -translate-y-9 sm:translate-y-0 sm:w-[40%] font-medium lg:text-base text-sm xl:text-lg sm:text-color7 text-green-950  font-2 space-y-4">
          <div className="text-color4">
            <h1 className="font-bold text-6xl font-3 leading-tight">
              {NAME_SYSTEM}
            </h1>
          </div>
          <div className={`bg-custom xl:p-5  p-3 rounded-lg `}>
            <p>
              Nổi tiếng là một trong những bệnh viện tư nhân hàng đầu tại miền
              Trung Việt Nam, bệnh viện {NAME_SYSTEM} Đà Nẵng cung cấp các dịch
              vụ chăm sóc sức khỏe chất lượng cao, dễ tiếp cận, phục vụ cho khu
              vực rộng lớn không chỉ ở Đà Nẵng. Bệnh viện phục vụ hơn 1.000 lượt
              bệnh nhân ngoại trú và 400 lượt bệnh nhân nội trú mỗi ngày, với 45
              khoa, 42 phòng điều trị và 8 phòng VIP. Chúng tôi cung cấp cơ sở
              vật chất hiện đại, đầy đủ tiện nghi, môi trường chuyên nghiệp và
              thân thiện, với sự đảm bảo chất lượng và sự hài lòng tuyệt vời của
              bệnh nhân là trọng tâm của chúng tôi. Các chuyên khoa chính của
              chúng tôi bao gồm từ khám sức khỏe toàn diện đến chăm sóc cấp cứu,
              phục vụ bệnh nhân ở mọi lứa tuổi.
            </p>
          </div>
        </div>
      </section>
      <section className="p-3">
        <h1 className="text-center font-semibold md:text-2xl text-lg text-color2">
          GIÁ TRỊ KHÁC BIỆT CỦA {NAME_SYSTEM}
        </h1>
        <ul
          className={`grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-4 max-h-screen overflow-y-auto`}
        >
          {specialThings.map((specialThing: ISpecialThing, index: number) => {
            return (
              <Tooltip key={index} title={specialThing.label ?? "Comming soon"}>
                <li
                  className={`flex flex-col justify-center items-center p-3 space-y-3 border-8 rounded-t-3xl rounded-bl-3xl special-thing`}
                >
                  <div className="basis-2/3">
                    <img src={specialThing.img} alt="gtr" className={`h-20`} />
                  </div>
                  <h1 className="flex-1 text-center font-bold md:text-lg text-base font-2">
                    {specialThing.title}
                  </h1>
                </li>
              </Tooltip>
            );
          })}
        </ul>
      </section>
      <section>
        <h1 className="text-center font-semibold md:text-2xl text-lg text-color2">
          CHUYÊN KHOA TIÊU BIỂU
        </h1>
        <ul
          className={`grid gap-4 xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-4 px-6 max-h-screen overflow-y-auto`}
        >
          {departments.map((dep: IDepartment, index: number) => {
            return (
              <li
                key={index}
                className={`flex flex-col justify-center items-center p-3 space-y-3 border-8 rounded-t-3xl rounded-bl-3xl department`}
              >
                <div className="basis-2/3 rounded-full border-4 border-color5 p-5 hover:bg-color5">
                  <img src={dep.img} alt="gtr" className={`h-20 w-20`} />
                </div>
                <h1 className="flex-1 text-center font-bold md:text-lg text-base font-2">
                  {dep.title}
                </h1>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="p-3 pb-0">
        <Suspense fallback={<Loading />}>
          <InfoBranch />
        </Suspense>
      </section>
      <section className="">
        <Divider />
        <Suspense fallback={<Loading />}>
          <FeedBack token={token} userCurrent={userCurrent} />
        </Suspense>
      </section>
    </article>
  );
};
export default HomeUser;
