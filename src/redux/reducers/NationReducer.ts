import { createSlice } from "@reduxjs/toolkit";

interface NationState {
  nations: string[];
}

const initialState: NationState = {
  nations: [],
};

export const nationSlice = createSlice({
  name: "nation",
  initialState,
  reducers: {
    getNations: (state, action) => {
      state.nations = action.payload.nations;
    },
  },
});

export const { getNations } = nationSlice.actions;

export default nationSlice.reducer;
