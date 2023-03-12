import { createSlice } from "@reduxjs/toolkit";
import IUser from "~/interfaces/user.interface";

interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
