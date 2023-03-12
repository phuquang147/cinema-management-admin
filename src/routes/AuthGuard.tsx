import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout";

const Auth = () => {
  const token = Cookies.get("token");
  if (token) return true;
  return false;
};

const AuthGuard = () => {
  const location = useLocation();

  if (location.pathname.startsWith("/quen-mat-khau")) return <Outlet />;

  let isAuth = Auth();
  return isAuth ? (
    <MainLayout />
  ) : (
    <Navigate
      to="/dang-nhap"
      state={{ message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại" }}
    />
  );
};

export default AuthGuard;
