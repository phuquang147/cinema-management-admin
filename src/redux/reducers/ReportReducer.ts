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

interface ReportState {
  dashboard: DashboardData | undefined;
}

const initialState: ReportState = {
  dashboard: undefined,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    getDashboard: (state, action) => {
      state.dashboard = action.payload.dashboard;
    },
  },
});

export const { getDashboard } = reportSlice.actions;

export default reportSlice.reducer;
