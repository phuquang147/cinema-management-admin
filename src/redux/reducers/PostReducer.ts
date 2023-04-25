import { createSlice } from "@reduxjs/toolkit";
import IPost from "~/interfaces/post.interface";

interface PostState {
  allPosts: IPost[];
  myPosts: IPost[];
}

const initialState: PostState = {
  allPosts: [],
  myPosts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getAllPosts: (state, action) => {
      return {
        ...state,
        allPosts: action.payload.allPosts,
      };
    },
    getMyPosts: (state, action) => {
      return {
        ...state,
        myPosts: action.payload.myPosts,
      };
    },
  },
});

export const { getAllPosts, getMyPosts } = postSlice.actions;

export default postSlice.reducer;
