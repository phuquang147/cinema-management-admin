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
