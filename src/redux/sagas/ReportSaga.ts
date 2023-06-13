import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import ReportServices from "~/services/reportServices";
import { reportSagaActionTypes } from "../sagaActionTypes";
import { getDashboard } from "../reducers/ReportReducer";

function* workGetDashboard() {
  try {
    let { data, status } = yield call(() => ReportServices.getDashboard());

    if (status === 200) {
      yield put(getDashboard({ dashboard: data.data }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getDashboardSaga() {
  yield takeLatest(reportSagaActionTypes.GET_DASHBOARD_SAGA, workGetDashboard);
}
