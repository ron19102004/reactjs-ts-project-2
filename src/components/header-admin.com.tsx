/* eslint-disable @typescript-eslint/no-explicit-any */

import { NavLink, useNavigate } from "react-router-dom";
import LOGO from "../assets/logo.png";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./styles/header.scss";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Tooltip } from "@chakra-ui/react";
import { Role } from "../redux/reducers/auth.reducer";
import { useDispatch } from "react-redux";
import { AuthModuleController } from "../pages/auths/auth.controller";
import { toast, ToastOptions } from "react-toastify";
import LockIcon from "@mui/icons-material/Lock";
interface IRouteAdmin {
  title: string;
  icon: any;
  path: string;
  role: Role;
}
const routes: IRouteAdmin[] = [
  { title: "Trang chủ", icon: "", path: "/", role: Role.admin },
  {
    title: "Chỉnh sửa thông tin",
    icon: "",
    path: "/edit-info",
    role: Role.master,
  },
  {
    title: "Lịch hẹn khách hàng",
    icon: "",
    path: "/my-booking",
    role: Role.admin,
  },
];
interface IHeaderAdminProps {
  userCurrent: any;
}
const HeaderAdmin: React.FC<IHeaderAdminProps> = ({ userCurrent }) => {
  const toastConfigs: ToastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsFixed(offset > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const changeStatusHeader = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header
        className={`font-3 z-50 ${
          isFixed
            ? "fixed transition-all bg-header-user text-cyan-300"
            : "bg-color2 text-color7"
        } min-w-full md:flex justify-between items-center px-3 md:px-6 py-1  `}
      >
        <section
          className={`flex justify-between md:justify-normal items-center space-x-3`}
        >
          <div
            className={`md:hidden border-2 p-1 rounded-lg ${
              isFixed ? "border-cyan-300" : ""
            }`}
          >
            {isOpen ? (
              <button onClick={changeStatusHeader}>
                <CloseIcon />
              </button>
            ) : (
              <button onClick={changeStatusHeader}>
                <MenuIcon />
              </button>
            )}
          </div>
          <div className={`flex items-center space-x-3`}>
            <div>
              <img src={LOGO} alt="logo" className={`w-10 md:w-14`} />
            </div>
            <h1 className="font-semibold text-lg md:text-2xl">TD Hospital</h1>
          </div>
        </section>
        <nav
          className={`${
            isOpen
              ? `absolute z-50 left-0 translate-y-1 md:static md:translate-y-0 py-3 md:py-0 ${
                  isFixed
                    ? "fixed transition-all bg-header-user text-cyan-300 md:bg-transparent"
                    : "bg-color2 text-color7"
                }`
              : "hidden"
          } w-full md:w-auto md:block`}
        >
          <ul
            className={`md:flex items-center text-base font-semibold space-y-3 space-x-0 md:space-x-2 md:space-y-0`}
          >
            {routes.map((route: IRouteAdmin, index: number) => {
              return (
                <li key={index} className={`link `}>
                  <NavLink
                    onClick={changeStatusHeader}
                    to={route.path}
                    className={({ isActive }) =>
                      isActive
                        ? `flex items-center ${
                            isFixed ? "a-active-fixed" : "a-active"
                          } px-5 py-2 mx-3 md:mx-0`
                        : ` flex items-center ${
                            isFixed ? "a-fixed" : "a"
                          } px-5 py-2 mx-3 md:mx-0`
                    }
                  >
                    {route.title}
                    {route.role !== userCurrent.role &&
                    userCurrent.role !== Role.master ? (
                      <div className="-translate-y-0.5">
                        <LockIcon
                          style={{
                            fontSize: "20px",
                          }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </NavLink>
                </li>
              );
            })}
            {userCurrent ? (
              <>
                <li className={`link`}>
                  <NavLink
                    onClick={changeStatusHeader}
                    to={"/my-profile"}
                    className={({ isActive }) =>
                      isActive
                        ? `flex items-center px-5 py-2 mx-3 md:mx-0  ${
                            isFixed ? "a-active-fixed" : "a-active"
                          }`
                        : ` flex items-center px-5 py-2 mx-3 md:mx-0 ${
                            isFixed ? "a-fixed" : "a"
                          }`
                    }
                  >
                    Tài khoản
                  </NavLink>
                </li>
                <li className={`link`}>
                  <NavLink
                    to={"/"}
                    onClick={() => {
                      AuthModuleController.logout(
                        dispatch,
                        { toast: toast, options: toastConfigs },
                        navigate
                      );
                      changeStatusHeader();
                    }}
                    className={`flex items-center px-5 py-2 mx-3 md:mx-0 ${
                      isFixed ? "a-fixed" : "a"
                    }`}
                  >
                    Đăng xuất
                  </NavLink>
                </li>
              </>
            ) : (
              <li className={`link`}>
                <NavLink
                  onClick={changeStatusHeader}
                  to={"/auth/login"}
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center px-5 py-2 mx-3 md:mx-0  ${
                          isFixed ? "a-active-fixed" : "a-active"
                        }`
                      : `flex items-center px-5 py-2 mx-3 md:mx-0 ${
                          isFixed ? "a-fixed" : "a"
                        }`
                  }
                >
                  Đăng nhập
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <section
        className={`z-50 ${
          isFixed ? "" : "hidden"
        } fixed md:bottom-5 md:right-5 bottom-0 right-3 text-color2 w-10 h-12`}
      >
        <Tooltip label="TOP">
          <a
            href="#"
            className="flex flex-col items-center justify-center bg-color5 px-4 py-1 rounded-xl"
          >
            <NavigationIcon />
          </a>
        </Tooltip>
      </section>
    </>
  );
};
export default HeaderAdmin;
