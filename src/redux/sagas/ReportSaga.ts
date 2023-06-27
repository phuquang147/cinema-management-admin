import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import ReportServices from "~/services/reportServices";
import {
  getDailyReport,
  getDashboard,
  getMonthlyReport,
  getMovieReport,
  getMovieReportByDate,
  getYearlyReport,
} from "../reducers/ReportReducer";
import { reportSagaActionTypes } from "../sagaActionTypes";

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

function* workGetDailyReport(action: {
  payload: { date: string };
  type: string;
}) {
  const { date } = action.payload;

  try {
    let { data, status } = yield call(() =>
      ReportServices.getDailyReport(date)
    );

    if (status === 200) {
      yield put(
        getDailyReport({
          dailyReport: { ...data.report.data, date: data.report.date },
        })
      );
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workGetMonthlyReport(action: {
  payload: { data: { month: number; year: number } };
  type: string;
}) {
  const { data: formData } = action.payload;

  try {
    let { data, status } = yield call(() =>
      ReportServices.getMonthlyReport(formData)
    );

    if (status === 200) {
      yield put(getMonthlyReport({ monthlyReport: data.report }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workGetYearlyReport(action: {
  payload: { year: number };
  type: string;
}) {
  const { year } = action.payload;

  try {
    let { data, status } = yield call(() =>
      ReportServices.getYearlyReport(year)
    );

    if (status === 200) {
      yield put(getYearlyReport({ yearlyReport: data.report }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workGetMovieReport(action: {
  payload: { movie: string };
  type: string;
}) {
  const { movie } = action.payload;

  try {
    let { data, status } = yield call(() =>
      ReportServices.getMovieReport(movie)
    );

    if (status === 200) {
      yield put(getMovieReport({ movieReport: data.report }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workGetMovieReportByDate(action: {
  payload: { movie: string; date: string };
  type: string;
}) {
  const { movie, date } = action.payload;

  try {
    let { data, status } = yield call(() =>
      ReportServices.getMovieReportByDate(movie, date)
    );

    if (status === 200) {
      yield put(getMovieReportByDate({ movieReportByDate: data.report }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getDashboardSaga() {
  yield takeLatest(reportSagaActionTypes.GET_DASHBOARD_SAGA, workGetDashboard);
}

export function* getDailyReportSaga() {
  yield takeLatest(
    reportSagaActionTypes.GET_DAILY_REPORT_SAGA,
    workGetDailyReport
  );
}

export function* getMonthlyReportSaga() {
  yield takeLatest(
    reportSagaActionTypes.GET_MONTHLY_REPORT_SAGA,
    workGetMonthlyReport
  );
}

export function* getYearlyReportSaga() {
  yield takeLatest(
    reportSagaActionTypes.GET_YEARLY_REPORT_SAGA,
    workGetYearlyReport
  );
}

export function* getMovieReportSaga() {
  yield takeLatest(
    reportSagaActionTypes.GET_MOVIE_REPORT_SAGA,
    workGetMovieReport
  );
}

export function* getMovieReportByDateSaga() {
  yield takeLatest(
    reportSagaActionTypes.GET_MOVIE_REPORT_BY_DATE_SAGA,
    workGetMovieReportByDate
  );
}
