import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import MovieServices from "~/services/movieServices";
import { getMovies } from "../reducers/MovieReducer";
import {
  actorSagaActionTypes,
  genreSagaActionTypes,
  movieSagaActionTypes,
} from "../sagaActionTypes";

function* workGetMovies() {
  try {
    let { data, status } = yield call(() => MovieServices.getMovies());

    if (status === 200) {
      yield put(getMovies({ movies: data.movies }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workAddMovie(action: any) {
  const { movie, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => MovieServices.addMovie(movie));

    if (status === 201) {
      yield put(getMovies({ movies: data.movies }));
      toast.success(data.message);
      navigate("/phim");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workUpdateMovie(action: any) {
  const { movie, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => MovieServices.updateMovie(movie));

    if (status === 200) {
      yield put(getMovies({ movies: data.movies }));
      toast.success(data.message);
      navigate("/phim");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workDeleteMovie(action: any) {
  const { id, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => MovieServices.deleteMovie(id));

    if (status === 200) {
      yield put(getMovies({ movies: data.movies }));
      toast.success(data.message);
      navigate("/phim");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workGetDataForMovie() {
  try {
    yield put({ type: actorSagaActionTypes.GET_ACTORS_SAGA });
    yield put({ type: genreSagaActionTypes.GET_GENRES_SAGA });
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getMoviesSaga() {
  yield takeLatest(movieSagaActionTypes.GET_MOVIES_SAGA, workGetMovies);
}

export function* addMovieSaga() {
  yield takeLatest(movieSagaActionTypes.ADD_MOVIE_SAGA, workAddMovie);
}

export function* updateMovieSaga() {
  yield takeLatest(movieSagaActionTypes.UPDATE_MOVIE_SAGA, workUpdateMovie);
}

export function* deleteMovieSaga() {
  yield takeLatest(movieSagaActionTypes.DELETE_MOVIE_SAGA, workDeleteMovie);
}

export function* getDataForMovieSaga() {
  yield takeLatest(
    movieSagaActionTypes.GET_DATA_FOR_MOVIE,
    workGetDataForMovie
  );
}
