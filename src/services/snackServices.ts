import Axios from "axios";
import Cookies from "js-cookie";
import {
  URL_ADD_SNACK,
  URL_DELETE_SNACK,
  URL_GET_SNACKS,
  URL_UPDATE_SNACK,
} from "./apiUrls";

const SnackServices = {
  getSnacks: () => {
    return Axios({
      url: URL_GET_SNACKS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  addSnack: (snack: any) => {
    return Axios({
      url: URL_ADD_SNACK,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: snack,
    });
  },
  updateSnack: (snack: any) => {
    return Axios({
      url: URL_UPDATE_SNACK(snack.id),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: snack,
    });
  },
  deleteSnack: (id: string) => {
    return Axios({
      url: URL_DELETE_SNACK(id),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export default SnackServices;
