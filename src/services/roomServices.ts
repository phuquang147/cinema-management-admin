import Axios from "axios";
import Cookies from "js-cookie";
import { RoomFormData } from "~/components/Rooms/RoomForm";
import {
  URL_ADD_ROOM,
  URL_DELETE_ROOM,
  URL_GET_ROOMS,
  URL_GET_ROOM_BY_ID,
  URL_UPDATE_ROOM,
} from "./apiUrls";

const RoomServices = {
  getRooms: () => {
    return Axios({
      url: URL_GET_ROOMS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  getRoomById: (id: string) => {
    return Axios({
      url: URL_GET_ROOM_BY_ID(id),
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  addRoom: (room: RoomFormData) => {
    return Axios({
      url: URL_ADD_ROOM,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: room,
    });
  },
  updateRoom: (room: RoomFormData) => {
    return Axios({
      url: URL_UPDATE_ROOM(room.id),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: room,
    });
  },
  deleteRoom: (id: string) => {
    return Axios({
      url: URL_DELETE_ROOM(id),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export default RoomServices;
