/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomeUser from "./pages/user/home";
import Login from "./pages/auths/login";
import ForgotPassword from "./pages/auths/forgot-password";
import { useSelector } from "react-redux";
import { Role } from "./redux/reducers/auth.reducer";
import HomeAdmin from "./pages/admin/home";
import Footer from "./components/footer.com";
import HeaderAdmin from "./components/header-admin.com";
import HeaderUser from "./components/header-user.com";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MyBookingAdmin from "./pages/admin/my-booking";
import EditInfoAdmin from "./pages/admin/edit-info";
import ProfileAdmin from "./pages/admin/profile";
import ProfileUser from "./pages/user/profile";
import Register from "./pages/auths/register";
import BookingUser from "./pages/user/booking";
import DepartmentPage from "./pages/user/department";
import Page403 from "./pages/errors/403";
import Page404 from "./pages/errors/404";
import DetailsAdmin from "./pages/user/booking/details-admin";

const App: React.FC = () => {
  const userCurrent = useSelector(
    (state: any) => state.authReducer?.userCurrent
  );
  const token = useSelector((state: any) => state.authReducer?.accessToken);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/*"
          element={
            <>
              {/* Header */}
              {userCurrent && userCurrent?.role !== Role.user ? (
                <HeaderAdmin userCurrent={userCurrent} />
              ) : (
                <HeaderUser userCurrent={userCurrent} token={token}/>
              )}
              {/* config routes */}
              <Routes>
                <Route
                  path="/"
                  element={
                    userCurrent && userCurrent?.role !== Role.user ? (
                      <HomeAdmin />
                    ) : (
                      <HomeUser />
                    )
                  }
                />
                <Route path="/home" element={<Navigate to={"/"} />} />
                <Route
                  path="/my-booking"
                  element={
                    userCurrent ? (
                      userCurrent?.role !== Role.user ? (
                        <MyBookingAdmin />
                      ) : (
                        <Navigate to={"/my-profile"} />
                      )
                    ) : (
                      <Navigate to={"/auth/login"} />
                    )
                  }
                />
                <Route
                  path="/booking/*"
                  element={
                    <Routes>
                      <Route
                        path="/"
                        element={
                         userCurrent === null || userCurrent?.role === Role.user ? (
                            <BookingUser />
                          ) : (
                            <Page403 />
                          )
                        }
                      />
                      <Route path="/details/:id" element={<DetailsAdmin />} />
                    </Routes>
                  }
                />
                <Route
                  path="/edit-info"
                  element={
                    userCurrent ? (
                      userCurrent?.role === Role.master ? (
                        <EditInfoAdmin />
                      ) : (
                        <Page403 />
                      )
                    ) : (
                      <Navigate to={"/auth/login"} />
                    )
                  }
                />
                <Route path="/departments" element={<DepartmentPage />} />
                <Route
                  path="/my-profile"
                  element={
                    userCurrent ? (
                      userCurrent?.role !== Role.user ? (
                        <ProfileAdmin />
                      ) : (
                        <ProfileUser />
                      )
                    ) : (
                      <Navigate to={"/auth/login"} />
                    )
                  }
                />
                <Route path="*" element={<Page404 />} />
              </Routes>
              {/* footer  */}
              <Footer />
            </>
          }
        />
        <Route
          path="/auth/*"
          element={
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/registation" element={<Register />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
