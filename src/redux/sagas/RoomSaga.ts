import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import RoomServices from "~/services/roomServices";
import { getRoomById, getRooms } from "../reducers/RoomReducer";
import {
  roomSagaActionTypes,
  roomTypeSagaActionTypes,
} from "../sagaActionTypes";
import { endLoading, startLoading } from "../reducers/LoadingReducer";
import { RoomFormData } from "~/components/Rooms/RoomForm";
import { NavigateFunction } from "react-router-dom";

function* workGetRooms() {
  try {
    let { data, status } = yield call(() => RoomServices.getRooms());

    if (status === 200) {
      yield put(getRooms({ rooms: data.rooms }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workGetRoomById(action: { payload: { id: string }; type: string }) {
  const { id } = action.payload;

  try {
    yield put(startLoading());
    let { data, status } = yield call(() => RoomServices.getRoomById(id));

    if (status === 200) {
      yield put(getRoomById({ room: data.room }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  } finally {
    yield put(endLoading());
  }
}

function* workAddRoom(action: {
  payload: { room: RoomFormData; navigate: NavigateFunction };
  type: string;
}) {
  const { room, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => RoomServices.addRoom(room));

    if (status === 201) {
      yield put(getRooms({ rooms: data.rooms }));
      toast.success(data.message);
      navigate("/phong-chieu");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workUpdateRoom(action: {
  payload: { room: RoomFormData; navigate: NavigateFunction };
  type: string;
}) {
  const { room, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => RoomServices.updateRoom(room));

    if (status === 200) {
      yield put(getRooms({ rooms: data.rooms }));
      toast.success(data.message);
      navigate("/phong-chieu");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workDeleteRoom(action: {
  payload: { id: string; navigate: NavigateFunction };
  type: string;
}) {
  const { id, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => RoomServices.deleteRoom(id));

    if (status === 200) {
      yield put(getRooms({ rooms: data.rooms }));
      toast.success(data.message);
      navigate("/phong-chieu");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workGetDataForRoom() {
  try {
    yield put({ type: roomTypeSagaActionTypes.GET_ROOM_TYPES_SAGA });
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getRoomsSaga() {
  yield takeLatest(roomSagaActionTypes.GET_ROOMS_SAGA, workGetRooms);
}

export function* getRoomByIdSaga() {
  yield takeLatest(roomSagaActionTypes.GET_ROOM_BY_ID_SAGA, workGetRoomById);
}

export function* addRoomSaga() {
  yield takeLatest(roomSagaActionTypes.ADD_ROOM_SAGA, workAddRoom);
}

export function* updateRoomSaga() {
  yield takeLatest(roomSagaActionTypes.UPDATE_ROOM_SAGA, workUpdateRoom);
}

export function* deleteRoomSaga() {
  yield takeLatest(roomSagaActionTypes.DELETE_ROOM_SAGA, workDeleteRoom);
}

export function* getDataForRoomSaga() {
  yield takeLatest(roomSagaActionTypes.GET_DATA_FOR_ROOM, workGetDataForRoom);
}
