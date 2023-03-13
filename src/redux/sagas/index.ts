import { all } from "redux-saga/effects";
import * as ActorSaga from "./ActorSaga";
import * as GenreSaga from "./GenreSaga";
import * as ImageSaga from "./ImageSaga";
import * as MovieSaga from "./MovieSaga";
import * as SnackSaga from "./SnackSaga";
import * as UserSaga from "./UserSaga";
import * as RoomTypeSaga from "./RoomTypeSaga";

export default function* rootSaga() {
  yield all([
    //User
    UserSaga.loginSaga(),
    UserSaga.resetPasswordSaga(),
    UserSaga.changePasswordSaga(),
    //Movie
    MovieSaga.getMoviesSaga(),
    //Genre
    GenreSaga.getGenresSaga(),
    GenreSaga.addGenreSaga(),
    GenreSaga.updateGenreSaga(),
    GenreSaga.deleteGenreSaga(),
    //Snacks
    SnackSaga.getSnacksSaga(),
    SnackSaga.addSnackSaga(),
    SnackSaga.updateSnackSaga(),
    SnackSaga.deleteSnackSaga(),
    //Snacks
    ActorSaga.getActorsSaga(),
    ActorSaga.addActorSaga(),
    ActorSaga.updateActorSaga(),
    ActorSaga.deleteActorSaga(),
    //Snacks
    RoomTypeSaga.getRoomTypesSaga(),
    RoomTypeSaga.addRoomTypeSaga(),
    RoomTypeSaga.updateRoomTypeSaga(),
    RoomTypeSaga.deleteRoomTypeSaga(),
    //Image
    ImageSaga.postImageSaga(),
  ]);
}
