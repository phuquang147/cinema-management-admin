import { RouteObject } from "react-router-dom";
import Dashboard from "~/pages/Dashboard";
import Page404 from "~/pages/Page404";
// Phim
import Movies from "~/pages/Movies";
import EditMovie from "~/pages/Movies/EditMovie";
import NewMovie from "~/pages/Movies/NewMovie";
// Nhân viên
import Staffs from "~/pages/Staffs";
import EditStaff from "~/pages/Staffs/EditStaff";
import NewStaff from "~/pages/Staffs/NewStaff";

const CommonRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  //Phim
  {
    path: "/phim",
    element: <Movies />,
  },
  {
    path: "/them-phim",
    element: <NewMovie />,
  },
  {
    path: "/phim/:id",
    element: <EditMovie />,
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
