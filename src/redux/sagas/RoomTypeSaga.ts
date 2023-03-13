import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import RoomTypeServices from "~/services/roomTypeServices";
import { getRoomTypes } from "../reducers/RoomTypeReducer";
import { roomTypeSagaActionTypes } from "../sagaActionTypes";

function* workGetRoomTypes() {
  try {
    let { data, status } = yield call(() => RoomTypeServices.getRoomTypes());
    if (status === 200) {
      yield put(getRoomTypes({ roomTypes: data.roomTypes }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workAddRoomType(action: any) {
  const { roomType, handleCloseModal } = action.payload;

  try {
    let { data, status } = yield call(() =>
      RoomTypeServices.addRoomType(roomType)
    );

    if (status === 201) {
      yield put(getRoomTypes({ roomTypes: data.roomTypes }));
      toast.success(data.message);
      handleCloseModal();
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workUpdateRoomType(action: any) {
  const { roomType, handleCloseModal } = action.payload;

  try {
    let { data, status } = yield call(() =>
      RoomTypeServices.updateRoomType(roomType)
    );

    if (status === 200) {
      yield put(getRoomTypes({ roomTypes: data.roomTypes }));
      toast.success(data.message);
      handleCloseModal(handleCloseModal);
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workDeleteRoomType(action: any) {
  const { id } = action.payload;

  try {
    let { data, status } = yield call(() =>
      RoomTypeServices.deleteRoomType(id)
    );

    if (status === 200) {
      yield put(getRoomTypes({ roomTypes: data.roomTypes }));
      toast.success(data.message);
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getRoomTypesSaga() {
  yield takeLatest(
    roomTypeSagaActionTypes.GET_ROOM_TYPES_SAGA,
    workGetRoomTypes
  );
}

export function* addRoomTypeSaga() {
  yield takeLatest(roomTypeSagaActionTypes.ADD_ROOM_TYPE_SAGA, workAddRoomType);
}

export function* updateRoomTypeSaga() {
  yield takeLatest(
    roomTypeSagaActionTypes.UPDATE_ROOM_TYPE_SAGA,
    workUpdateRoomType
  );
}

export function* deleteRoomTypeSaga() {
  yield takeLatest(
    roomTypeSagaActionTypes.DELETE_ROOM_TYPE_SAGA,
    workDeleteRoomType
  );
}
