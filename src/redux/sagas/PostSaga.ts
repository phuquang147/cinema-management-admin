import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { PostFormData } from "~/components/Posts/PostForm";
import PostServices from "~/services/postServices";
import { getAllPosts, getMyPosts } from "../reducers/PostReducer";
import { postSagaActionTypes } from "../sagaActionTypes";

function* workGetAllPosts() {
  try {
    let { data, status } = yield call(() => PostServices.getAllPosts());

    if (status === 200) {
      yield put(getAllPosts({ allPosts: data.posts }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workGetMyPosts() {
  try {
    let { data, status } = yield call(() => PostServices.getMyPosts());

    if (status === 200) {
      yield put(getMyPosts({ myPosts: data.posts }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workAddPost(action: {
  payload: { post: PostFormData; navigate: NavigateFunction };
  type: string;
}) {
  const { post, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => PostServices.addPost(post));

    if (status === 201) {
      yield put(getMyPosts({ myPosts: data.posts }));
      toast.success(data.message);
      navigate("/bai-viet");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workUpdatePost(action: {
  payload: { post: PostFormData; navigate: NavigateFunction };
  type: string;
}) {
  const { post, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => PostServices.updatePost(post));

    if (status === 200) {
      yield put(getMyPosts({ myPosts: data.posts }));
      toast.success(data.message);
      navigate("/bai-viet");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workDeletePost(action: {
  payload: { id: string; navigate: NavigateFunction };
  type: string;
}) {
  const { id, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => PostServices.deletePost(id));

    if (status === 200) {
      yield put(getMyPosts({ myPosts: data.posts }));
      toast.success(data.message);
      navigate("/bai-viet");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getAllPostsSaga() {
  yield takeLatest(postSagaActionTypes.GET_ALL_POSTS_SAGA, workGetAllPosts);
}

export function* getMyPostsSaga() {
  yield takeLatest(postSagaActionTypes.GET_MY_POSTS_SAGA, workGetMyPosts);
}

export function* addPostSaga() {
  yield takeLatest(postSagaActionTypes.ADD_POST_SAGA, workAddPost);
}

export function* updatePostSaga() {
  yield takeLatest(postSagaActionTypes.UPDATE_POST_SAGA, workUpdatePost);
}

export function* deletePostSaga() {
  yield takeLatest(postSagaActionTypes.DELETE_POST_SAGA, workDeletePost);
}
