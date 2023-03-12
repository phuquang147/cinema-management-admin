import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import ActorServices from "~/services/actorServices";
import { getActors } from "../reducers/ActorReducer";
import { actorSagaActionTypes } from "../sagaActionTypes";

function* workGetActors() {
  try {
    let { data, status } = yield call(() => ActorServices.getActors());
    if (status === 200) {
      yield put(getActors({ actors: data.actors }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workAddActor(action: any) {
  const { actor, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => ActorServices.addActor(actor));

    if (status === 201) {
      yield put(getActors({ actors: data.actors }));
      toast.success(data.message);
      navigate("/dien-vien");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workUpdateActor(action: any) {
  const { actor, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => ActorServices.updateActor(actor));

    if (status === 200) {
      yield put(getActors({ actors: data.actors }));
      toast.success(data.message);
      navigate("/dien-vien");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workDeleteActor(action: any) {
  const { id, navigate } = action.payload;

  try {
    let { data, status } = yield call(() => ActorServices.deleteActor(id));

    if (status === 200) {
      yield put(getActors({ actors: data.actors }));
      toast.success(data.message);
      navigate("/dien-vien");
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getActorsSaga() {
  yield takeLatest(actorSagaActionTypes.GET_ACTORS_SAGA, workGetActors);
}

export function* addActorSaga() {
  yield takeLatest(actorSagaActionTypes.ADD_ACTOR_SAGA, workAddActor);
}

export function* updateActorSaga() {
  yield takeLatest(actorSagaActionTypes.UPDATE_ACTOR_SAGA, workUpdateActor);
}

export function* deleteActorSaga() {
  yield takeLatest(actorSagaActionTypes.DELETE_ACTOR_SAGA, workDeleteActor);
}
