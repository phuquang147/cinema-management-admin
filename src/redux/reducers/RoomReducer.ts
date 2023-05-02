import { createSlice } from "@reduxjs/toolkit";
import IRoom from "~/interfaces/room.interface";

interface RoomState {
  rooms: IRoom[];
  edittingRoom: IRoom | null;
}

const initialState: RoomState = {
  rooms: [],
  edittingRoom: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    getRooms: (state, action) => {
      state.rooms = action.payload.rooms;
    },
    getRoomById: (state, action) => {
      return {
        ...state,
        edittingRoom: { ...action.payload.room },
      };
    },
  },
});

export const { getRooms, getRoomById } = roomSlice.actions;

export default roomSlice.reducer;
