import MinimalLayout from "~/layouts/MinimalLayout";
import Login from "~/pages/Login";

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
    // {
    //   path: '/forgot-password',
    //   element: <ForgotPassword />,
    // },
    // {
    //   path: '/reset-password/:token',
    //   element: <ForgotPassword />,
    // },
  ],
};

export default AuthenticationRoutes;
