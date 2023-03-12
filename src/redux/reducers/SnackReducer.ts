import { createSlice } from "@reduxjs/toolkit";
import ISnack from "~/interfaces/snack.interface";

interface SnackState {
  snacks: ISnack[];
}

const initialState: SnackState = {
  snacks: [],
};

export const snackSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    getSnacks: (state, action) => {
      state.snacks = action.payload.snacks;
    },
  },
});

export const { getSnacks } = snackSlice.actions;

export default snackSlice.reducer;
