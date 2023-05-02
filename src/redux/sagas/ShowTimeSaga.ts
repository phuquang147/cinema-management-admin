import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { ShowTimeFormData } from "~/components/ShowTimes/ShowTimeForm";
import ShowTimeServices from "~/services/showTimeServices";
import { getShowTimes } from "../reducers/ShowTimeReducer";
import {
  movieSagaActionTypes,
  roomSagaActionTypes,
  showTimeSagaActionTypes,
} from "../sagaActionTypes";

function* workGetShowTimesByDate(action: {
  payload: { date: string };
  type: string;
}) {
  const { date } = action.payload;

  try {
    let { data, status } = yield call(() =>
      ShowTimeServices.getShowTimesByDate(date)
    );

    if (status === 200) {
      yield put(getShowTimes({ showTimes: data.showTimes }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workAddShowTime(action: {
  payload: { showTime: ShowTimeFormData; handleCloseModal: () => void };
  type: string;
}) {
  const { showTime, handleCloseModal } = action.payload;

  try {
    let { data, status } = yield call(() =>
      ShowTimeServices.addShowTime(showTime)
    );

    if (status === 201) {
      yield put(getShowTimes({ showTimes: data.showTimes }));
      toast.success(data.message);
      handleCloseModal();
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workUpdateShowTime(action: {
  payload: { showTime: ShowTimeFormData; handleCloseModal: () => void };
  type: string;
}) {
  const { showTime, handleCloseModal } = action.payload;

  try {
    let { data, status } = yield call(() =>
      ShowTimeServices.updateShowTime(showTime)
    );

    if (status === 200) {
      yield put(getShowTimes({ showTimes: data.showTimes }));
      toast.success(data.message);
      handleCloseModal();
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workDeleteShowTime(action: {
  payload: { id: string; handleCloseModal: () => void };
  type: string;
}) {
  const { id, handleCloseModal } = action.payload;

  try {
    let { data, status } = yield call(() =>
      ShowTimeServices.deleteShowTime(id)
    );

    if (status === 200) {
      yield put(getShowTimes({ showTimes: data.showTimes }));
      toast.success(data.message);
      handleCloseModal();
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workGetDataForRoom() {
  try {
    yield put({ type: roomSagaActionTypes.GET_ROOMS_SAGA });
    yield put({ type: movieSagaActionTypes.GET_MOVIES_SAGA });
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getShowTimesByDateSaga() {
  yield takeLatest(
    showTimeSagaActionTypes.GET_SHOW_TIMES_BY_DATE_SAGA,
    workGetShowTimesByDate
  );
}

export function* addShowTimeSaga() {
  yield takeLatest(showTimeSagaActionTypes.ADD_SHOW_TIME_SAGA, workAddShowTime);
}

export function* updateShowTimeSaga() {
  yield takeLatest(
    showTimeSagaActionTypes.UPDATE_SHOW_TIME_SAGA,
    workUpdateShowTime
  );
}

export function* deleteShowTimeSaga() {
  yield takeLatest(
    showTimeSagaActionTypes.DELETE_SHOW_TIME_SAGA,
    workDeleteShowTime
  );
}

export function* getDataForShowTimeSaga() {
  yield takeLatest(
    showTimeSagaActionTypes.GET_DATA_FOR_SHOW_TIME,
    workGetDataForRoom
  );
}
