import MinimalLayout from "~/layouts/MinimalLayout";
import ForgotPassword from "~/pages/Auth/ForgotPassword";
import Login from "~/pages/Auth/Login";

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/dang-nhap",
      element: <Login />,
    },
    {
      path: "/quen-mat-khau",
      element: <ForgotPassword />,
    },
    {
      path: "/quen-mat-khau/:token/:id",
      element: <ForgotPassword />,
    },
  ],
};

export default AuthenticationRoutes;
