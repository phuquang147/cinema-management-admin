import React from "react";
import { ToastContainer } from "react-toastify";
import Routes from "./routes";

const App: React.FC = () => {
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
