import Axios from "axios";
import { URL_FORGOT_PASSWORD, URL_LOGIN, URL_RESET_PASSWORD } from "./apiUrls";

const AuthServices = {
  login: (data: any) => {
    return Axios({
      url: URL_LOGIN,
      method: "POST",
      data,
    });
  },

  resetPassword: (data: any) => {
    return Axios({
      url: URL_FORGOT_PASSWORD,
      method: "POST",
      data,
    });
  },

  changePassword: (data: any) => {
    return Axios({
      url: URL_RESET_PASSWORD,
      method: "POST",
      data,
    });
  },
};

export default AuthServices;
