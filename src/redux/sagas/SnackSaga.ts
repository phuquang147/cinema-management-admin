import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import SnackServices from "~/services/snackServices";
import { getSnacks } from "../reducers/SnackReducer";
import { snackSagaActionTypes } from "../sagaActionTypes";

function* workGetSnacks() {
  try {
    let { data, status } = yield call(() => SnackServices.getSnacks());
    if (status === 200) {
      yield put(getSnacks({ snacks: data.items }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workAddSnack(action: any) {
  const { snack, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => SnackServices.addSnack(snack));

    if (status === 201) {
      yield put(getSnacks({ snacks: data.items }));
      toast.success(data.message);
      navigate("/do-an-nhe");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workUpdateSnack(action: any) {
  const { snack, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => SnackServices.updateSnack(snack));

    if (status === 200) {
      yield put(getSnacks({ snacks: data.items }));
      toast.success(data.message);
      navigate("/do-an-nhe");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workDeleteSnack(action: any) {
  const { id, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => SnackServices.deleteSnack(id));

    if (status === 200) {
      yield put(getSnacks({ snacks: data.items }));
      toast.success(data.message);
      navigate("/do-an-nhe");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getSnacksSaga() {
  yield takeLatest(snackSagaActionTypes.GET_SNACKS_SAGA, workGetSnacks);
}

export function* addSnackSaga() {
  yield takeLatest(snackSagaActionTypes.ADD_SNACK_SAGA, workAddSnack);
}

export function* updateSnackSaga() {
  yield takeLatest(snackSagaActionTypes.UPDATE_SNACK_SAGA, workUpdateSnack);
}

export function* deleteSnackSaga() {
  yield takeLatest(snackSagaActionTypes.DELETE_SNACK_SAGA, workDeleteSnack);
}
