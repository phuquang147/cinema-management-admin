import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import StaffServices from "~/services/staffServices";
import { getStaffs } from "../reducers/StaffReducer";
import { staffSagaActionTypes } from "../sagaActionTypes";

function* workGetStaffs() {
  try {
    let { data, status } = yield call(() => StaffServices.getStaffs());

    if (status === 200) {
      yield put(getStaffs({ staffs: data.users }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workAddStaff(action: any) {
  const { staff, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => StaffServices.addStaff(staff));

    if (status === 201) {
      yield put(getStaffs({ staffs: data.users }));
      toast.success(data.message);
      navigate("/nhan-vien");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workUpdateStaff(action: any) {
  const { staff, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => StaffServices.updateStaff(staff));

    if (status === 201) {
      yield put(getStaffs({ staffs: data.users }));
      toast.success(data.message);
      navigate("/nhan-vien");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workDeleteStaff(action: any) {
  const { id, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => StaffServices.deleteStaff(id));

    if (status === 200) {
      yield put(getStaffs({ staffs: data.users }));
      toast.success(data.message);
      navigate("/nhan-vien");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getStaffsSaga() {
  yield takeLatest(staffSagaActionTypes.GET_STAFFS_SAGA, workGetStaffs);
}

export function* addStaffSaga() {
  yield takeLatest(staffSagaActionTypes.ADD_STAFF_SAGA, workAddStaff);
}

export function* updateStaffSaga() {
  yield takeLatest(staffSagaActionTypes.UPDATE_STAFF_SAGA, workUpdateStaff);
}

export function* deleteStaffSaga() {
  yield takeLatest(staffSagaActionTypes.DELETE_STAFF_SAGA, workDeleteStaff);
}
