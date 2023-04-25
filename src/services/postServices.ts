import Axios from "axios";
import Cookies from "js-cookie";
import { PostFormData } from "~/components/Posts/PostForm";
import {
  URL_ADD_POST,
  URL_DELETE_POST,
  URL_GET_ALL_POSTS,
  URL_GET_MY_POSTS,
  URL_UPDATE_POST,
} from "./apiUrls";

const PostServices = {
  getAllPosts: () => {
    return Axios({
      url: URL_GET_ALL_POSTS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  getMyPosts: () => {
    return Axios({
      url: URL_GET_MY_POSTS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  addPost: (post: PostFormData) => {
    return Axios({
      url: URL_ADD_POST,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: post,
    });
  },
  updatePost: (post: PostFormData) => {
    return Axios({
      url: URL_UPDATE_POST(post.id),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: post,
    });
  },
  deletePost: (id: string) => {
    return Axios({
      url: URL_DELETE_POST(id),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export default PostServices;
