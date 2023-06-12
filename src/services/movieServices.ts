import Axios from "axios";
import Cookies from "js-cookie";
import {
  URL_ADD_MOVIE,
  URL_DELETE_MOVIE,
  URL_GET_MOVIES,
  URL_UPDATE_MOVIE,
} from "./apiUrls";

const MovieServices = {
  getMovies: () => {
    return Axios({
      url: URL_GET_MOVIES,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  addMovie: (movie: any) => {
    return Axios({
      url: URL_ADD_MOVIE,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: movie,
    });
  },
  updateMovie: (movie: any) => {
    return Axios({
      url: URL_UPDATE_MOVIE(movie.id),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: movie,
    });
  },
  deleteMovie: (id: string) => {
    return Axios({
      url: URL_DELETE_MOVIE(id),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export default MovieServices;
