import { RouteObject } from "react-router-dom";
import Dashboard from "~/pages/Dashboard";
import Page404 from "~/pages/Page404";
// Phim
import Movies from "~/pages/Movies";
import EditMovie from "~/pages/Movies/EditMovie";
import NewMovie from "~/pages/Movies/NewMovie";
// Diễn viên
import Actors from "~/pages/Actors";
import EditActor from "~/pages/Actors/EditActor";
import NewActor from "~/pages/Actors/NewActor";
// Nhân viên
import Staffs from "~/pages/Staffs";
import EditStaff from "~/pages/Staffs/EditStaff";
import NewStaff from "~/pages/Staffs/NewStaff";
// Bài viết
import Posts from "~/pages/Posts";
import EditPost from "~/pages/Posts/EditPost";
import NewPost from "~/pages/Posts/NewPost";

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
  // Diễn viên
  {
    path: "/dien-vien",
    element: <Actors />,
  },
  {
    path: "/them-dien-vien",
    element: <NewActor />,
  },
  {
    path: "/dien-vien/:id",
    element: <EditActor />,
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
  // Bài viết
  {
    path: "/bai-viet",
    element: <Posts />,
  },
  {
    path: "/them-bai-viet",
    element: <NewPost />,
  },
  {
    path: "/bai-viet/:id",
    element: <EditPost />,
  },
  //
  {
    path: "*",
    element: <Page404 />,
  },
];

export default CommonRoutes;
