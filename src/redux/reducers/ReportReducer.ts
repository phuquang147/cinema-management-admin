import { createSlice } from "@reduxjs/toolkit";

export type RecentTransaction = {
  _id: string;
  customer?: { name: string };
  staff?: { name: string };
  movie: { name: string; thumbnail: string };
  createdAt: string;
};

export type DashboardData = {
  soldTickets: number;
  revenue: number;
  remainingTickets: number;
  recentTransactions: RecentTransaction[];
  onGoingMovies: number;
};

export type GeneralMovieReport = {
  id: string;
  name: string;
  soldTicketQuantity: number;
  thumbnail: string;
  ticketRevenue: number;
};

export type GeneralItemReport = {
  id: string;
  name: string;
  quantity: number;
  totalPrice: number;
  image: string;
};

export type GeneralDateInMonthReport = {
  id: string;
  date: string;
  itemRevenue: number;
  ticketRevenue: number;
  totalRevenue: number;
};

export type GeneralMonthInYearReport = {
  id: string;
  month: string;
  itemRevenue: number;
  ticketRevenue: number;
  totalRevenue: number;
};

export type MovieReport = {
  id: string;
  date: string;
  remainingTicketQuantity: number;
  soldTicketQuantity: number;
  totalRevenue: number;
};

export type MovieReportAll = {
  data: MovieReport[];
  movie: string;
};

interface ReportState {
  dashboard: DashboardData | undefined;
  dailyReport:
    | {
        movies: GeneralMovieReport[];
        items: GeneralItemReport[];
        totalMovieRevenue: number;
        totalItemRevenue: number;
        date: string;
      }
    | undefined;
  monthlyReport:
    | { data: GeneralDateInMonthReport[]; month: number; year: number }
    | undefined;
  yearlyReport: { data: GeneralMonthInYearReport[]; year: number } | undefined;
  movieReportByDate:
    | {
        movie: string;
        data: {
          remainingTicketQuantity: number;
          soldTicketQuantity: number;
          totalRevenue: number;
        };
      }
    | undefined;
  movieReport: MovieReportAll | undefined;
}

const initialState: ReportState = {
  dashboard: undefined,
  dailyReport: undefined,
  monthlyReport: undefined,
  yearlyReport: undefined,
  movieReportByDate: undefined,
  movieReport: undefined,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    getDashboard: (state, action) => {
      state.dashboard = action.payload.dashboard;
    },
    getDailyReport: (state, action) => {
      const { dailyReport } = action.payload;

      state.dailyReport = {
        ...dailyReport,
        movies: Object.keys(dailyReport.movies).map((key) => ({
          id: key,
          ...dailyReport.movies[key],
        })),
        items: Object.keys(dailyReport.items).map((key) => ({
          id: key,
          ...dailyReport.items[key],
        })),
        totalMovieRevenue: Object.values(dailyReport.movies).reduce(
          (total, currentMovie) => total + (currentMovie as any).ticketRevenue,
          0
        ) as number,
        totalItemRevenue: Object.values(dailyReport.items).reduce(
          (total, currentMovie) => total + (currentMovie as any).totalPrice,
          0
        ) as number,
      };
    },
    getMonthlyReport: (state, action) => {
      const { monthlyReport } = action.payload;

      state.monthlyReport = {
        ...monthlyReport,
        data: monthlyReport.data.map((report: GeneralDateInMonthReport) => ({
          ...report,
          id: report.date,
        })),
      };
    },
    getYearlyReport: (state, action) => {
      const { yearlyReport } = action.payload;

      state.yearlyReport = {
        ...yearlyReport,
        data: yearlyReport.data.map((report: GeneralMonthInYearReport) => ({
          ...report,
          id: report.month,
        })),
      };
    },
    getMovieReportByDate: (state, action) => {
      const { movieReportByDate } = action.payload;

      state.movieReportByDate = { ...movieReportByDate };
    },
    getMovieReport: (state, action) => {
      const { movieReport } = action.payload;

      state.movieReport = {
        ...movieReport,
        data: movieReport.data.map((data: MovieReport) => ({
          ...data,
          id: data.date,
        })),
      };
    },
  },
});

export const {
  getDashboard,
  getDailyReport,
  getMonthlyReport,
  getYearlyReport,
  getMovieReport,
  getMovieReportByDate,
} = reportSlice.actions;

export default reportSlice.reducer;
