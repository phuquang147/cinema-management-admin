import Axios from "axios";
import { EmailFormData } from "~/components/ForgotPassword/EmailForm";
import { ResetPasswordFormData } from "~/components/ForgotPassword/ResetForm";
import { LoginFormData } from "~/components/Login/LoginForm";
import { ProfileFormData } from "~/components/Profile/ProfileForm";
import {
  URL_FORGOT_PASSWORD,
  URL_LOGIN,
  URL_RESET_PASSWORD,
  URL_UPDATE_USER,
} from "./apiUrls";
import Cookies from "js-cookie";

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
  updateUser: (data: ProfileFormData) => {
    console.log(data);

    return Axios({
      url: URL_UPDATE_USER(data.id),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data,
    });
  },
};

export default AuthServices;
