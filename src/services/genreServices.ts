import Axios from "axios";
import Cookies from "js-cookie";
import {
  URL_ADD_GENRE,
  URL_DELETE_GENRE,
  URL_GET_GENRES,
  URL_UPDATE_GENRE,
} from "./apiUrls";

const token = Cookies.get("token");

const GenreServices = {
  getGenres: () => {
    return Axios({
      url: URL_GET_GENRES,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addGenre: (genre: any) => {
    return Axios({
      url: URL_ADD_GENRE,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: genre,
    });
  },
  updateGenre: (genre: any) => {
    return Axios({
      url: URL_UPDATE_GENRE(genre.id),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: genre,
    });
  },
  deleteGenre: (id: any) => {
    return Axios({
      url: URL_DELETE_GENRE(id),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default GenreServices;
