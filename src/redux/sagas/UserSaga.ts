import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import AuthServices from "~/services/authServices";
import { getUser } from "../reducers/UserReducer";
import { authSagaActionTypes } from "../sagaActionTypes";

function* workLogin(action: any) {
  const { data: payloadData, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => AuthServices.login(payloadData));

    if (status === 200) {
      toast.success("Đăng nhập thành công");
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      Cookies.set("token", data.token, { expires: expiryDate });
      navigate("/", { replace: true });
      yield put(getUser(data.user));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workResetPassword(action: any) {
  const { data: payloadData, navigate } = action.payload;

  try {
    let { status } = yield call(() => AuthServices.resetPassword(payloadData));
    if (status === 200) {
      toast.success("Yêu cầu thay đổi mật khẩu thành công!");
      navigate("/dang-nhap");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workChangePassword(action: any) {
  const { data: payloadData, navigate } = action.payload;

  try {
    let { status } = yield call(() => AuthServices.changePassword(payloadData));

    if (status === 201) {
      toast.success("Thay đổi mật khẩu thành công!");
      navigate("/login");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* loginSaga() {
  yield takeLatest(authSagaActionTypes.LOGIN_SAGA, workLogin);
}

export function* resetPasswordSaga() {
  yield takeLatest(authSagaActionTypes.RESET_PASSWORD_SAGA, workResetPassword);
}

export function* changePasswordSaga() {
  yield takeLatest(
    authSagaActionTypes.CHANGE_PASSWORD_SAGA,
    workChangePassword
  );
}
