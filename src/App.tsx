import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Cookie from "js-cookie";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./redux/hooks";
import { getUser } from "./redux/reducers/UserReducer";
import Routes from "./routes";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = Cookie.get("user");
    if (user) {
      dispatch(getUser(JSON.parse(user)));
    }
  }, [dispatch]);

  dayjs.extend(updateLocale);
  dayjs.extend(relativeTime);

  dayjs.updateLocale("en", {
    relativeTime: {
      future: "%s",
      past: "% ngày trước",
      s: "vài giây trước",
      m: "một phút trước",
      mm: "%d phút trước",
      h: "1 giờ trước",
      hh: "%d giờ trước",
      d: "1 ngày trước",
      dd: "%d ngày trước",
      M: "1 tháng trước",
      MM: "%d tháng trước",
      y: "1 năm trước",
      yy: "%d năm trước",
    },
  });

  return (
    <>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={true}
      />
    </>
  );
};

export default App;
