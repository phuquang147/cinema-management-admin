import Axios from "axios";
import Cookies from "js-cookie";
import { URL_GET_NATIONS } from "./apiUrls";

const CommonServices = {
  getNations: () => {
    return Axios({
      url: URL_GET_NATIONS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export default CommonServices;
