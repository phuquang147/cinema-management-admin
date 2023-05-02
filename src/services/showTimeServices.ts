import Axios from "axios";
import Cookies from "js-cookie";
import {
  URL_ADD_SHOW_TIME,
  URL_DELETE_SHOW_TIME,
  URL_GET_SHOW_TIMES_BY_DATE,
  URL_UPDATE_SHOW_TIME,
} from "./apiUrls";
import { ShowTimeFormData } from "~/components/ShowTimes/ShowTimeForm";

const ShowTimeServices = {
  getShowTimesByDate: (date: string) => {
    return Axios({
      url: URL_GET_SHOW_TIMES_BY_DATE(date),
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  addShowTime: (showTime: ShowTimeFormData) => {
    return Axios({
      url: URL_ADD_SHOW_TIME,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: showTime,
    });
  },
  updateShowTime: (showTime: ShowTimeFormData) => {
    return Axios({
      url: URL_UPDATE_SHOW_TIME(showTime.id),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: showTime,
    });
  },
  deleteShowTime: (id: string) => {
    return Axios({
      url: URL_DELETE_SHOW_TIME(id),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export default ShowTimeServices;
