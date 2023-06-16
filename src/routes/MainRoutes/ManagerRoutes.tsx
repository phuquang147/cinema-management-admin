import { RouteObject } from "react-router-dom";
import Page404 from "~/pages/404";
import Dashboard from "~/pages/Dashboard";
// Đặt vé
import Booking from "~/pages/Booking";
// Phim
import Movies from "~/pages/Movies";
import EditMovie from "~/pages/Movies/EditMovie";
import NewMovie from "~/pages/Movies/NewMovie";
// Lịch chiếu
import ShowTimes from "~/pages/ShowTimes";
// Phòng chiếu
import Rooms from "~/pages/Rooms";
import EditRoom from "~/pages/Rooms/EditRoom";
import NewRoom from "~/pages/Rooms/NewRoom";
// Bắp nước
import Snacks from "~/pages/Snacks";
import EditSnack from "~/pages/Snacks/EditSnack";
import NewSnack from "~/pages/Snacks/NewSnack";
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
// Giao dịch
import Transactions from "~/pages/Transactions";
// Báo cáo
import Report from "~/pages/Report";
// Cài đặt chung
import Genres from "~/pages/Settings/Genres";
import RoomTypes from "~/pages/Settings/RoomTypes";
// Thông tin
import Profile from "~/pages/Profile";

const ManagerRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  //
  {
    path: "/dat-ve",
    element: <Booking />,
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
  // Lịch chiếu
  {
    path: "/lich-chieu",
    element: <ShowTimes />,
  },
  // Phòng chiếu
  {
    path: "/phong-chieu",
    element: <Rooms />,
  },
  {
    path: "/them-phong-chieu",
    element: <NewRoom />,
  },
  {
    path: "/phong-chieu/:id",
    element: <EditRoom />,
  },
  // Bắp nước
  {
    path: "/do-an-nhe",
    element: <Snacks />,
  },
  {
    path: "/them-do-an-nhe",
    element: <NewSnack />,
  },
  {
    path: "/do-an-nhe/:id",
    element: <EditSnack />,
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
  // Giao dịch
  {
    path: "/giao-dich",
    element: <Transactions />,
  },
  // Báo cáo
  {
    path: "/bao-cao",
    element: <Report />,
  },
  // Cài đặt chung
  {
    path: "/the-loai-phim",
    element: <Genres />,
  },
  {
    path: "/loai-phong-chieu",
    element: <RoomTypes />,
  },
  // Thông tin
  {
    path: "/chinh-sua-thong-tin",
    element: <Profile />,
  },
  //
  {
    path: "*",
    element: <Page404 />,
  },
];

export default ManagerRoutes;
