import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import ImageServices from "~/services/imageServices";
import { endLoading, startLoading } from "../reducers/LoadingReducer";
import { imageSagaActionTypes } from "../sagaActionTypes";

function* workPostImage(action: any) {
  const { image, handleGetImageUrl } = action.payload;

  yield put(startLoading());

  try {
    let { data, status } = yield call(() => ImageServices.postImage(image));

    if (status === 201) {
      toast.success(data.message);
      handleGetImageUrl(data.filePath);
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }

  yield put(endLoading());
}

export function* postImageSaga() {
  yield takeEvery(imageSagaActionTypes.POST_IMAGE_SAGA, workPostImage);
}
