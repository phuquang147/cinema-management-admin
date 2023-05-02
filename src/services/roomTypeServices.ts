import Axios from "axios";
import Cookies from "js-cookie";
import { RoomTypeFormData } from "~/components/Settings/RoomTypeForm";
import {
  URL_ADD_ROOM_TYPE,
  URL_DELETE_ROOM_TYPE,
  URL_GET_ROOM_TYPES,
  URL_UPDATE_ROOM_TYPE,
} from "./apiUrls";

const RoomTypeServices = {
  getRoomTypes: () => {
    return Axios({
      url: URL_GET_ROOM_TYPES,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  addRoomType: (roomType: RoomTypeFormData) => {
    return Axios({
      url: URL_ADD_ROOM_TYPE,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: roomType,
    });
  },
  updateRoomType: (roomType: RoomTypeFormData) => {
    return Axios({
      url: URL_UPDATE_ROOM_TYPE(roomType.id),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: roomType,
    });
  },
  deleteRoomType: (id: string) => {
    return Axios({
      url: URL_DELETE_ROOM_TYPE(id),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export default RoomTypeServices;
