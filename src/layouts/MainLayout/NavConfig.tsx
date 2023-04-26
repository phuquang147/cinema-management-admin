import { ReactElement } from "react";
import Iconify from "~/components/Iconify";

const getIcon = (name: string) => (
  <Iconify icon={name} sx={{ width: 22, height: 22 }} />
);

export interface INavConfig {
  title: string;
  path?: string;
  icon: ReactElement;
  info?: string;
  children?: { path: string; title: string }[];
}

const navConfig: INavConfig[] = [
  {
    title: "Thống kê",
    path: "/",
    icon: getIcon("akar-icons:statistic-up"),
  },
  {
    title: "Đặt vé",
    path: "/dat-ve",
    icon: getIcon("carbon:ticket"),
  },
  {
    title: "Phim",
    path: "/phim",
    icon: getIcon("ic:outline-movie-filter"),
  },
  {
    title: "Lịch chiếu",
    path: "/lich-chieu",
    icon: getIcon("material-symbols:calendar-month-rounded"),
  },
  {
    title: "Phòng chiếu",
    path: "/phong-chieu",
    icon: getIcon("fluent:conference-room-16-regular"),
  },
  {
    title: "Đồ ăn nhẹ",
    path: "/do-an-nhe",
    icon: getIcon("ph:popcorn"),
  },
  {
    title: "Diễn viên",
    path: "/dien-vien",
    icon: getIcon("material-symbols:recent-actors-rounded"),
  },
  {
    title: "Nhân viên",
    path: "/nhan-vien",
    icon: getIcon("mdi:user"),
  },
  {
    title: "Bài viết",
    path: "/bai-viet",
    icon: getIcon("bi:file-post"),
  },
  {
    title: "Giao dịch",
    path: "/giao-dich",
    icon: getIcon("solar:bill-list-outline"),
  },
  {
    title: "Báo cáo",
    path: "/bao-cao",
    icon: getIcon("iconoir:stats-report"),
  },
  {
    title: "Cài đặt chung",
    icon: getIcon("ep:setting"),
    children: [
      {
        title: "Thể loại phim",
        path: "/the-loai-phim",
      },
      {
        title: "Loại phòng chiếu",
        path: "/loai-phong-chieu",
      },
    ],
  },
];

export default navConfig;
