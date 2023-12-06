/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import "./styles/footer.scss";
import { Tooltip } from "@chakra-ui/react";
import { AuthModuleController } from "../pages/auths/auth.controller";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import dathongbao from "../assets/dathongbao.png";
import facebook from "../assets/facebook.png";
import { INFO } from "../helpers/constant";
const Footer: React.FC = () => {
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
  const userCurrent = useSelector(
    (state: any) => state.authReducer.userCurrent
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <footer className="bg-color2 p-10 mt-5 font-2 text-color5">
      <ToastContainer />
      <section className="xl:flex justify-around items-center">
        <div>
          <h1> CÔNG TY CỔ PHẦN BỆNH VIỆN ĐA KHOA TD</h1>
          <h2>
            Số đăng ký kinh doanh: 0392477615 cấp bởi Sở kế hoạch và đầu tư
            Thành phố Đà Nẵng, đăng ký lần đầu ngày 12 tháng 1 năm 2004
          </h2>
        </div>
        <div className="flex space-x-5 items-center justify-center">
          <div>
            <img src={dathongbao} alt="da thong bao" className="w-32" />
          </div>
          <div>
            <a href={`${INFO.facebook}`}>
              <img src={facebook} alt="fb" className="w-10" />
            </a>
          </div>
        </div>
      </section>
      {userCurrent ? (
        <section className="flex justify-center items-center">
          <Tooltip label="Đăng xuất">
            <button
              onClick={() => {
                AuthModuleController.logout(
                  dispatch,
                  { toast: toast, options: toastConfigs },
                  navigate
                );
              }}
            >
              <span className="italic text-sm">uid:{userCurrent.id}id</span>
            </button>
          </Tooltip>
        </section>
      ) : (
        ""
      )}
    </footer>
  );
};
export default Footer;
