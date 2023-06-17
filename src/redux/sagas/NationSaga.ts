import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import NationServices from "~/services/commonServices";
import { getNations } from "../reducers/NationReducer";
import { commonSagaActionTypes } from "../sagaActionTypes";

function* workGetNations() {
  try {
    let { data, status } = yield call(() => NationServices.getNations());

    if (status === 200) {
      yield put(getNations({ nations: data.nations }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getNationsSaga() {
  yield takeLatest(commonSagaActionTypes.GET_NATIONS_SAGA, workGetNations);
}
