/* eslint-disable @typescript-eslint/no-explicit-any */
import SignInImg from "../../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Tooltip } from "@chakra-ui/react";
import { toast, ToastOptions } from "react-toastify";
import Button from "@material-ui/core/Button";
import { ESex } from "../../admin/profile/my-profile";
import { ValidatorCustomModule } from "../../../helpers/validator";
import { AuthModuleController } from "../auth.controller";

export interface IPayloadRegistation {
  firstName: string;
  lastName: string;
  address: string;
  password: string;
  sex: string;
  age: number;
  phoneNumber: string;
  email: string;
}
const Register: React.FC = () => {
  const navigate = useNavigate();
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
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data: any) => {
    const { re_password, ...pl } = data;
    const payload = pl as IPayloadRegistation;
    if (
      ValidatorCustomModule.isNumber(payload.firstName) ||
      ValidatorCustomModule.isNumber(payload.lastName)
    ) {
      toast.error("Tên người dùng không được là số", toastConfigs);
      return;
    }
    if (payload.phoneNumber.length > 11) {
      toast.error("Chiều dài số điện thoại không hợp lệ", toastConfigs);
      return;
    }
    if (!ValidatorCustomModule.isEmail(payload.email)) {
      toast.error("Email không hợp lệ", toastConfigs);
      return;
    }
    if (payload.age > 100 || payload.age <= 0) {
      toast.error("Tuổi không hợp lệ", toastConfigs);
      return;
    }
    if ((payload.password + "").length < 8) {
        toast.error("Mật khẩu phải trên 8 ký tự", toastConfigs);
        return;
      }
    if (payload.password + "" !== re_password + "") {
      toast.error("Mật khẩu không khớp", toastConfigs);
      return;
    }
    await AuthModuleController.register(
      { toast: toast, options: toastConfigs },
      navigate,
      payload
    );
    reset();
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
              Kinh Nghiệm và Tận Tâm
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={`space-y-5`}>
            <section className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="text-sm font-semibold text-color4_1">
                  Họ tên đệm
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className={`w-full outline-none border rounded h-10 px-3 hover:border-green-800 focus:border-green-800 text-color4_1`}
                  required
                  placeholder="Trần Ngọc Anh"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-color4_1">
                  Tên
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className={`w-full outline-none border rounded h-10 px-3 hover:border-green-800 focus:border-green-800 text-color4_1`}
                  required
                  placeholder="Dũng"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-color4_1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  {...register("phoneNumber")}
                  className={`w-full outline-none border rounded h-10 px-3 hover:border-green-800 focus:border-green-800 text-color4_1`}
                  required
                  placeholder="0392477615"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-color4_1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full outline-none border rounded h-10 px-3 hover:border-green-800 focus:border-green-800 text-color4_1`}
                  required
                  placeholder="ron19102004@gmail.com"
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
              <div>
                <label className="text-sm font-semibold text-color4_1">
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  {...register("re_password")}
                  className={`w-full outline-none border rounded h-10 px-3 hover:border-green-800 focus:border-green-800 text-color4_1`}
                  required
                  placeholder="********"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-color4_1">
                  Tuổi
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className={`w-full outline-none border rounded h-10 px-3 hover:border-green-800 focus:border-green-800 text-color4_1`}
                  required
                  placeholder="19"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-color4_1">
                  Tuổi
                </label>
                <select
                  className={`w-full outline-none border rounded h-10 px-3 hover:border-green-800 focus:border-green-800 text-color4_1`}
                  required
                  {...register("sex")}
                >
                  <option value={ESex.male} defaultChecked>
                    Nam
                  </option>
                  <option value={ESex.female}>Nữ</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-color4_1">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  {...register("address")}
                  className={`w-full outline-none border rounded h-10 px-3 hover:border-green-800 focus:border-green-800 text-color4_1`}
                  required
                  placeholder="Bình phước"
                />
              </div>
            </section>
            <div
              className={`flex flex-col justify-center items-center space-y-3`}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full bg-color2"
              >
                <span className="font-3">Đăng ký</span>
              </Button>
              <NavLink
                to={"/auth/login"}
                className={` text-yellow-400 hover:text-yellow-500 font-2`}
              >
                Bạn đã có tài khoản?
                <span className="font-3 hover:underline hover:text-red-500">
                  {" "}
                  Đăng nhập
                </span>
              </NavLink>
            </div>
          </form>
        </section>
      </main>
    </article>
  );
};
export default Register;
