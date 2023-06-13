import Axios from "axios";
import Cookies from "js-cookie";
import {
  URL_ADD_STAFF,
  URL_DELETE_STAFF,
  URL_GET_STAFFS,
  URL_UPDATE_STAFF,
} from "./apiUrls";

const StaffServices = {
  getStaffs: () => {
    return Axios({
      url: URL_GET_STAFFS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  addStaff: (staff: any) => {
    return Axios({
      url: URL_ADD_STAFF,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: staff,
    });
  },
  updateStaff: (staff: any) => {
    return Axios({
      url: URL_UPDATE_STAFF(staff.id),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: staff,
    });
  },
  deleteStaff: (id: string) => {
    return Axios({
      url: URL_DELETE_STAFF(id),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export default StaffServices;
