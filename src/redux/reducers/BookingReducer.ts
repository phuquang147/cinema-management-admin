import { createSlice } from "@reduxjs/toolkit";
import IShowTime from "~/interfaces/showTime.interface";
import ISnack from "~/interfaces/snack.interface";
import { ITicket } from "~/interfaces/ticket.interface";

export interface IExtendedSnack extends ISnack {
  count: number;
}

interface BookingState {
  showTime: IShowTime | null;
  tickets: ITicket[];
  snacks: IExtendedSnack[];
}

const initialState: BookingState = {
  showTime: null,
  tickets: [],
  snacks: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    selectShowTime: (state, action) => {
      return {
        ...state,
        showTime: action.payload,
      };
    },
    selectTickets: (state, action) => {
      return {
        ...state,
        tickets: action.payload,
      };
    },
    getSnacks: (state, action) => {
      return {
        ...state,
        snacks: action.payload.map((snack: ISnack) => ({ ...snack, count: 0 })),
      };
    },
    increaseSnackQuantity: (state, action) => {
      const snack = action.payload;
      const snacks = [...state.snacks];
      const index = snacks.findIndex((s) => s._id === snack._id);

      if (index > -1)
        snacks[index] = { ...snacks[index], count: snacks[index].count + 1 };

      return {
        ...state,
        snacks,
      };
    },
    decreaseSnackQuantity: (state, action) => {
      const snack = action.payload;
      let snacks = [...state.snacks];
      const index = snacks.findIndex((s) => s._id === snack._id);

      if (index > -1)
        snacks[index] = { ...snacks[index], count: snacks[index].count - 1 };

      return {
        ...state,
        snacks,
      };
    },
    resetData: () => {
      return {
        showTime: null,
        snacks: [],
        tickets: [],
      };
    },
  },
});

export const {
  selectShowTime,
  getSnacks,
  increaseSnackQuantity,
  decreaseSnackQuantity,
  selectTickets,
  resetData,
} = bookingSlice.actions;

export default bookingSlice.reducer;
