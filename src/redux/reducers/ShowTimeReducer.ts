import { createSlice } from "@reduxjs/toolkit";
import IShowTime from "~/interfaces/showTime.interface";

interface ShowTimeState {
  showTimes: IShowTime[];
}

const initialState: ShowTimeState = {
  showTimes: [],
};

export const showTimeSlice = createSlice({
  name: "showTime",
  initialState,
  reducers: {
    getShowTimes: (state, action) => {
      const { showTimes } = action.payload;

      return {
        ...state,
        showTimes,
      };
    },
  },
});

export const { getShowTimes } = showTimeSlice.actions;

export default showTimeSlice.reducer;
