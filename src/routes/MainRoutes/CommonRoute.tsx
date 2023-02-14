import { RouteObject } from "react-router-dom";
import Dashboard from "~/pages/Dashboard";
import Page404 from "~/pages/Page404";
import Staffs from "~/pages/Staffs";
import EditStaff from "~/pages/Staffs/EditStaff";
import NewStaff from "~/pages/Staffs/NewStaff";

const CommonRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  //Nhân viên
  {
    path: "/nhan-vien",
    element: <Staffs />,
  },
  {
    path: "/them-nhan-vien",
    element: <NewStaff />,
  },
  {
    path: "/nhan-vien/:id",
    element: <EditStaff />,
  },
  //
  {
    path: "*",
    element: <Page404 />,
  },
];

export default CommonRoutes;
