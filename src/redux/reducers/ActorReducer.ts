import { createSlice } from "@reduxjs/toolkit";
import IActor from "~/interfaces/actor.interface";

interface ActorState {
  actors: IActor[];
}

const initialState: ActorState = {
  actors: [],
};

export const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {
    getActors: (state, action) => {
      state.actors = action.payload.actors;
    },
  },
});

export const { getActors } = actorSlice.actions;

export default actorSlice.reducer;
