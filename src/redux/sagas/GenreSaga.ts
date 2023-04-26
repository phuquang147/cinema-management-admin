import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { GenreFormData } from "~/components/Settings/GenreForm";
import GenreServices from "~/services/genreServices";
import { getGenres } from "../reducers/GenreReducer";
import { genreSagaActionTypes } from "../sagaActionTypes";

function* workGetGenres() {
  try {
    let { data, status } = yield call(() => GenreServices.getGenres());
    if (status === 200) {
      yield put(getGenres({ genres: data.genres }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workAddGenre(action: {
  payload: { genre: GenreFormData; handleCloseModal: () => void };
  type: string;
}) {
  const { genre, handleCloseModal } = action.payload;

  try {
    let { data, status } = yield call(() => GenreServices.addGenre(genre));

    if (status === 201) {
      yield put(getGenres({ genres: data.genres }));
      toast.success(data.message);
      handleCloseModal();
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workUpdateGenre(action: {
  payload: { genre: GenreFormData; handleCloseModal: () => void };
  type: string;
}) {
  const { genre, handleCloseModal } = action.payload;

  try {
    let { data, status } = yield call(() => GenreServices.updateGenre(genre));

    if (status === 200) {
      yield put(getGenres({ genres: data.genres }));
      toast.success(data.message);
      handleCloseModal();
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workDeleteGenre(action: {
  payload: { id: string; handleCloseModal: () => void };
  type: string;
}) {
  const { id } = action.payload;

  try {
    let { data, status } = yield call(() => GenreServices.deleteGenre(id));

    if (status === 200) {
      yield put(getGenres({ genres: data.genres }));
      toast.success(data.message);
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getGenresSaga() {
  yield takeLatest(genreSagaActionTypes.GET_GENRES_SAGA, workGetGenres);
}

export function* addGenreSaga() {
  yield takeLatest(genreSagaActionTypes.ADD_GENRE_SAGA, workAddGenre);
}

export function* updateGenreSaga() {
  yield takeLatest(genreSagaActionTypes.UPDATE_GENRE_SAGA, workUpdateGenre);
}

export function* deleteGenreSaga() {
  yield takeLatest(genreSagaActionTypes.DELETE_GENRE_SAGA, workDeleteGenre);
}
