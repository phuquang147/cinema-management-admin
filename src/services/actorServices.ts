import Axios from "axios";
import Cookies from "js-cookie";
import {
  URL_ADD_ACTOR,
  URL_DELETE_ACTOR,
  URL_GET_ACTORS,
  URL_UPDATE_ACTOR,
} from "./apiUrls";

const token = Cookies.get("token");

const ActorServices = {
  getActors: () => {
    return Axios({
      url: URL_GET_ACTORS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addActor: (actor: any) => {
    return Axios({
      url: URL_ADD_ACTOR,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: actor,
    });
  },
  updateActor: (actor: any) => {
    return Axios({
      url: URL_UPDATE_ACTOR(actor.id),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: actor,
    });
  },
  deleteActor: (id: string) => {
    return Axios({
      url: URL_DELETE_ACTOR(id),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default ActorServices;
