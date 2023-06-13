import Axios from "axios";
import Cookies from "js-cookie";
import { URL_GET_DASHBOARD } from "./apiUrls";

const ReportServices = {
  getDashboard: () => {
    return Axios({
      url: URL_GET_DASHBOARD,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export default ReportServices;
