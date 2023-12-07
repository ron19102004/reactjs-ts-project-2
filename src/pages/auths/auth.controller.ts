/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { URL } from "../../helpers/constant";
import {
  login,
  logout,
  reloadUserCurrent,
} from "../../redux/reducers/auth.reducer";
import { ToastOptions } from "react-toastify";

class AuthController {
  public login = async (
    dispatch: any,
    toast: {
      toast: any;
      options: ToastOptions;
    },
    payload: {
      username: string;
      password: string;
      method: EMethodsLogin | null;
    },
    navigate: any
  ) => {
    const device: string = navigator.userAgent;
    try {
      await axios
        .post(
          `${URL}/auths/login`,
          {
            login_method: payload.method,
            data_login_first: payload.username,
            password: payload.password,
            deviceName: device,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (response) => {
          if (response.data.status !== 200) {
            toast.toast.error(`${response.data.message}`, toast.options);
            return;
          }
          const data = response.data.data as {
            access_token: string;
            refresh_token: string;
          };
          await axios
            .get(`${URL}/auths/profile`, {
              headers: {
                Authorization: "Bearer " + data.access_token,
              },
            })
            .then(async (resp) => {
              const userCurrent = resp.data.data;
              dispatch(
                login({
                  userCurrent: userCurrent,
                  role: userCurrent.role,
                  accessToken: data.access_token,
                  refreshToken: data.refresh_token,
                })
              );
              toast.toast.success(`Đăng nhập thành công`, toast.options);
              this.handleLogin(dispatch, toast, navigate);
              navigate("/");
            })
            .catch((err) => {
              toast.toast.error(`${err.message}`, toast.options);
            });
        })
        .catch((err) => {
          toast.toast.error(`${err.message}`, toast.options);
        });
    } catch (error: any) {
      toast.toast.error(`${error.message}`, toast.options);
    }
  };
  public handleLogin = (
    dispatch: any,
    toast: {
      toast: any;
      options: ToastOptions;
    },
    navigate: any
  ) => {
    const task1 = new Promise(() => {
      setTimeout(() => {
        alert("Hết phiên đăng nhập. Vui lòng đăng nhập lại");
        this.logout(dispatch, toast, navigate);
      }, 1000 * 60 * 120);
    });
    const task2 = new Promise(() => {
      setTimeout(() => {
        toast.toast.warning("Hệ thống sắp hết phiên đăng nhập", toast.options);
      }, 1000 * 60 * 115);
    });
    Promise.all([task1, task2]);
  };
  public logout = (
    dispatch: any,
    toast: {
      toast: any;
      options: ToastOptions;
    },
    navigate: any
  ) => {
    try {
      dispatch(logout());
      toast.toast.success(`Đã đăng xuất khỏi hệ thống`, toast.options);
      navigate("/");
    } catch (error: any) {
      toast.toast.error(`${error.message}`, toast.options);
    }
  };
  public reloadUserCurrent$ = async (dispatch: any, token: string) => {
    await axios
      .get(`${URL}/auths/profile`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(async (resp: any) => {        
        const userCurrent = resp.data.data;
        dispatch(reloadUserCurrent({ userCurrent: userCurrent }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export enum EMethodsLogin {
  phone = "PHONE_NUMBER",
  email = "EMAIL",
}
export const AuthModuleController: AuthController = new AuthController();
