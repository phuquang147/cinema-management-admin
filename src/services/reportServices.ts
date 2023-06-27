import Axios from "axios";
import Cookies from "js-cookie";
import {
  URL_GET_DAILY_REPORT,
  URL_GET_DASHBOARD,
  URL_GET_MONTHLY_REPORT,
  URL_GET_MOVIE_REPORT,
  URL_GET_YEARLY_REPORT,
} from "./apiUrls";

const ReportServices = {
  getDashboard: () => {
    return Axios({
      url: URL_GET_DASHBOARD,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  getDailyReport: (date: string) => {
    return Axios({
      url: URL_GET_DAILY_REPORT,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: {
        date,
      },
    });
  },
  getMonthlyReport: (data: { month: number; year: number }) => {
    return Axios({
      url: URL_GET_MONTHLY_REPORT,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data,
    });
  },
  getYearlyReport: (year: number) => {
    return Axios({
      url: URL_GET_YEARLY_REPORT,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: {
        year,
      },
    });
  },
  getMovieReport: (movie: string) => {
    return Axios({
      url: URL_GET_MOVIE_REPORT(movie),
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  getMovieReportByDate: (movie: string, date: string) => {
    return Axios({
      url: URL_GET_MOVIE_REPORT(movie),
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: {
        date,
      },
    });
  },
};

export default ReportServices;
