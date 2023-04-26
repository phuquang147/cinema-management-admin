import Axios from "axios";
import { EmailFormData } from "~/components/ForgotPassword/EmailForm";
import { ResetPasswordFormData } from "~/components/ForgotPassword/ResetForm";
import { LoginFormData } from "~/components/Login/LoginForm";
import { URL_FORGOT_PASSWORD, URL_LOGIN, URL_RESET_PASSWORD } from "./apiUrls";

const AuthServices = {
  login: (data: LoginFormData) => {
    return Axios({
      url: URL_LOGIN,
      method: "POST",
      data,
    });
  },

  resetPassword: (data: EmailFormData) => {
    return Axios({
      url: URL_FORGOT_PASSWORD,
      method: "POST",
      data,
    });
  },

  changePassword: (data: ResetPasswordFormData) => {
    return Axios({
      url: URL_RESET_PASSWORD,
      method: "POST",
      data,
    });
  },
};

export default AuthServices;
