/* eslint-disable @typescript-eslint/no-explicit-any */

import { NavLink, useNavigate } from "react-router-dom";
import LOGO from "../assets/logo.png";
import { Suspense, lazy, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./styles/header.scss";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Tooltip } from "@chakra-ui/react";
import { AuthModuleController } from "../pages/auths/auth.controller";
import { ToastOptions, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { NAME_SYSTEM } from "../helpers/constant";
import { Loading } from "../pages/admin/my-booking";
import { NotifyModuleControllerUser } from "../pages/user/notify/notify.controller";

const Notify = lazy(() => import("../pages/user/notify/index"));
interface IRoute {
  title: string;
  icon: any;
  path: string;
}
const routes: IRoute[] = [
  { title: "Trang chủ", icon: "", path: "/" },
  { title: "Chuyên khoa", icon: "", path: "/departments" },
  { title: "Đặt hẹn", icon: "", path: "/booking" },
];
interface IHeaderUserProps {
  userCurrent: any;
  token: string;
}
const HeaderUser: React.FC<IHeaderUserProps> = ({ userCurrent, token }) => {
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
  const [openNotify, setOpenNotify] = useState(false);
  const [quantityNotify, setQuantityNotify] = useState<number>(0);
  const handleQuantityNotify = async () => {
    if (userCurrent) {
      const count = await NotifyModuleControllerUser.countSeenYet(
        userCurrent?.id,
        token
      );
      setQuantityNotify(count);
    }
  };
  const changeOpenNotify = () => {
    setOpenNotify(!openNotify);
  };
  useEffect(() => {
    setInterval(()=>handleQuantityNotify(), 10000)
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
        className={`font-7 z-50 ${
          isFixed
            ? "fixed transition-all bg-header-user text-cyan-300 "
            : "bg-color2 text-color7 absolute md:static"
        } min-w-full md:flex justify-between items-center px-3 md:px-6 py-1  `}
      >
        <section
          className={`flex justify-between md:justify-normal items-center space-x-3`}
        >
          <div className="md:hidden flex space-x-4 items-center">
            <div
              className={`md:hidden border-2 p-1.5 rounded-lg ${
                isFixed ? "border-cyan-300" : ""
              }`}
            >
              {isOpen ? (
                <span onClick={changeStatusHeader}>
                  <CloseIcon />
                </span>
              ) : (
                <span onClick={changeStatusHeader}>
                  <MenuIcon />
                </span>
              )}
            </div>
            <Tooltip
              label={`${
                quantityNotify !== 0
                  ? `Có ${quantityNotify} thông báo chưa đọc`
                  : "Thông báo"
              }`}
            >
              <span className={`relative md:hidden`} onClick={changeOpenNotify}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
                {quantityNotify > 0 && (
                  <span className="absolute -top-0 -right-0 text-red-500 flex justify-center items-center text-xs">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  </span>
                )}
              </span>
            </Tooltip>
          </div>
          <div className={`flex items-center space-x-3`}>
            <div>
              <img src={LOGO} alt="logo" className={`w-10 md:w-14`} />
            </div>
            <h1 className="font-semibold font-6 text-lg md:text-2xl">
              {NAME_SYSTEM}
            </h1>
          </div>
        </section>
        <nav
          className={`${
            isOpen
              ? `absolute left-0 translate-y-1 md:static md:translate-y-0 py-3 md:py-0 ${
                  isFixed
                    ? "fixed transition-all bg-header-user md:bg-transparent  text-cyan-300"
                    : "bg-color2 text-color7"
                }`
              : "hidden"
          } w-full md:w-auto md:block`}
        >
          <ul
            className={`md:flex items-center text-base font-semibold space-y-3 space-x-0 md:space-x-2 md:space-y-0`}
          >
            {routes.map((route: IRoute, index: number) => {
              return (
                <li key={index} className={`link `}>
                  <NavLink
                    onClick={changeStatusHeader}
                    to={route.path}
                    className={({ isActive }) =>
                      isActive
                        ? `flex items-center ${
                            route.path === "/booking"
                              ? `md:border-2 rounded-md ${
                                  isFixed
                                    ? "border-cyan-300  text-slate-900 bg-cyan-300"
                                    : "bg-white text-color2"
                                }`
                              : `${isFixed ? "a-active-fixed" : "a-active"}`
                          } px-5 py-2 mx-3 md:mx-0`
                        : ` flex items-center ${
                            route.path === "/booking"
                              ? `md:border-2 rounded-md ${
                                  isFixed
                                    ? "border-cyan-300 hover:bg-cyan-300 hover:text-slate-900"
                                    : "hover:bg-white hover:text-color2"
                                }`
                              : `${isFixed ? "a-fixed" : "a"}`
                          } px-5 py-2 mx-3 md:mx-0`
                    }
                  >
                    {route.title}
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
                        : `flex items-center px-5 py-2 mx-3 md:mx-0 ${
                            isFixed ? "a-fixed" : "a"
                          }`
                    }
                  >
                    Tài khoản của tôi
                  </NavLink>
                </li>
                <li>
                  <Tooltip
                    label={`${
                      quantityNotify !== 0
                        ? `Có ${quantityNotify} thông báo chưa đọc`
                        : "Thông báo"
                    }`}
                  >
                    <span
                      className={`relative hidden md:block`}
                      onClick={changeOpenNotify}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 "
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                        />
                      </svg>
                      {quantityNotify > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 text-red-500 flex justify-center items-center text-xs">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        </span>
                      )}
                    </span>
                  </Tooltip>
                  {openNotify ? (
                    <>
                      <Suspense fallback={<Loading />}>
                        <Notify
                          id_user={userCurrent?.id}
                          open={openNotify}
                          setOpen={changeOpenNotify}
                          token={token}
                          quantityNotifySeenYet={quantityNotify}
                        />
                      </Suspense>
                    </>
                  ) : (
                    ""
                  )}
                </li>
                <li className={`link`}>
                  <button
                    onClick={() => {
                      AuthModuleController.logout(
                        dispatch,
                        { toast: toast, options: toastConfigs },
                        navigate
                      );
                      changeStatusHeader();
                    }}
                    className={`px-5 py-2 mx-3 md:mx-0 ${
                      isFixed ? "a-fixed" : "a"
                    }`}
                  >
                    Đăng xuất
                  </button>
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
                      : ` flex items-center px-5 py-2 mx-3 md:mx-0 ${
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
export default HeaderUser;
