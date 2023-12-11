/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.scss";
import SignInImg from "../../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Tooltip } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AuthModuleController, EMethodsLogin } from "../auth.controller";
import { ValidatorCustomModule } from "../../../helpers/validator";
import { toast, ToastOptions } from "react-toastify";
import Button from "@material-ui/core/Button";
import { useEffect } from "react";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCurrent = useSelector(
    (state: any) => state.authReducer?.userCurrent
  );
  const init = () => {
    if (userCurrent) {
      navigate("/");
    }
  };
  useEffect(() => {
    init();
  }, []);
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
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    let method: EMethodsLogin | null = null;
    if (ValidatorCustomModule.isEmail(data.username))
      method = EMethodsLogin.email;
    else if (ValidatorCustomModule.isPhoneNumber(data.username))
      method = EMethodsLogin.phone;
    if (!method) {
      toast.error(
        "Số điện thoại hoặc email không đúng định dạng!",
        toastConfigs
      );
      return;
    }
    if (data.password.length < 8) {
      toast.error(
        "Mật khẩu không hợp lệ. Độ dài mật khẩu phải trên 8 ký tự!",
        toastConfigs
      );
      return;
    }
    AuthModuleController.login(
      dispatch,
      {
        toast: toast,
        options: toastConfigs,
      },
      {
        username: data.username.trim(),
        password: data.password.trim(),
        method: method,
      },
      navigate
    );
  };
  return (
    <article className={`relative bg-color2 min-h-screen font-2`}>
      <main
        className={`flex flex-col justify-center items-center min-h-screen`}
      >
        <section
          className={`bg-color7 p-10 rounded-md md:shadow-lg md:hover:shadow-xl mx-5`}
        >
          <div className="flex flex-col justify-center items-center">
            <Tooltip label="Trang chủ">
              <NavLink
                to={"/"}
                className="border-2 rounded-full p-2 border-color2 hover:bg-color2 hover:scale-150 transition-all "
              >
                <img src={SignInImg} alt="logo" className="w-16" />
              </NavLink>
            </Tooltip>
            <h1
              className={`text-center font-bold text-3xl mb-5 text-color2 login-title font-3`}
            >
              Hãy cho tôi biết BẠN LÀ AI ?
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={`space-y-3`}>
            <div>
              <label className="text-sm font-semibold text-color4_1">
                Số điện thoại hoặc email
              </label>
              <input
                type="text"
                {...register("username")}
                className={`w-full outline-none border rounded h-10 px-3 hover:border-green-800 focus:border-green-800 text-color4_1`}
                required
                placeholder="tdhospital@gmail.com hoặc 0392477615"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-color4_1">
                Mật khẩu
              </label>
              <input
                type="password"
                {...register("password")}
                className={`w-full outline-none border rounded h-10 px-3 hover:border-green-800 focus:border-green-800 text-color4_1`}
                required
                placeholder="********"
              />
            </div>
            <div
              className={`flex flex-col justify-center items-center space-y-3`}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full bg-color2"
              >
                <span className="font-3">Đăng nhập</span>
              </Button>
              <NavLink
                to={"/auth/forgot-password"}
                className={`hover:underline text-yellow-400 hover:text-yellow-500 font-3`}
              >
                Quên mật khẩu
              </NavLink>
              <NavLink
                to={"/auth/registation"}
                className={`hover:underline text-red-400 hover:text-red-500 font-3`}
              >
                Đăng ký
              </NavLink>
            </div>
          </form>
        </section>
      </main>
    </article>
  );
};
export default Login;
