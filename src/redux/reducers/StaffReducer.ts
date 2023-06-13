import { createSlice } from "@reduxjs/toolkit";
import IStaff from "~/interfaces/staff.interface";

interface StaffState {
  staffs: IStaff[];
}

const initialState: StaffState = {
  staffs: [],
};

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    getStaffs: (state, action) => {
      state.staffs = action.payload.staffs;
    },
  },
});

export const { getStaffs } = staffSlice.actions;

export default staffSlice.reducer;
