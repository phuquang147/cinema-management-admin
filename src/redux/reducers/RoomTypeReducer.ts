import { createSlice } from "@reduxjs/toolkit";
import IRoomType from "~/interfaces/roomType.interface";

interface RoomTypeState {
  roomTypes: IRoomType[];
}

const initialState: RoomTypeState = {
  roomTypes: [],
};

export const roomTypeSlice = createSlice({
  name: "roomType",
  initialState,
  reducers: {
    getRoomTypes: (state, action) => {
      state.roomTypes = action.payload.roomTypes;
    },
  },
});

export const { getRoomTypes } = roomTypeSlice.actions;

export default roomTypeSlice.reducer;
