import { RouteObject } from "react-router-dom";
import Dashboard from "~/pages/Dashboard";
import Page404 from "~/pages/Page404";

const CommonRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
];

export default CommonRoutes;
