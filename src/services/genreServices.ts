import Axios from "axios";
import Cookies from "js-cookie";
import { GenreFormData } from "~/components/Settings/GenreForm";
import {
  URL_ADD_GENRE,
  URL_DELETE_GENRE,
  URL_GET_GENRES,
  URL_UPDATE_GENRE,
} from "./apiUrls";

const GenreServices = {
  getGenres: () => {
    return Axios({
      url: URL_GET_GENRES,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  addGenre: (genre: GenreFormData) => {
    return Axios({
      url: URL_ADD_GENRE,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: genre,
    });
  },
  updateGenre: (genre: GenreFormData) => {
    return Axios({
      url: URL_UPDATE_GENRE(genre.id),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: genre,
    });
  },
  deleteGenre: (id: string) => {
    return Axios({
      url: URL_DELETE_GENRE(id),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export default GenreServices;
