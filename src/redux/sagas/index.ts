import { all } from "redux-saga/effects";
import * as ActorSaga from "./ActorSaga";
import * as GenreSaga from "./GenreSaga";
import * as ImageSaga from "./ImageSaga";
import * as MovieSaga from "./MovieSaga";
import * as PostSaga from "./PostSaga";
import * as RoomSaga from "./RoomSaga";
import * as RoomTypeSaga from "./RoomTypeSaga";
import * as ShowTimeSaga from "./ShowTimeSaga";
import * as SnackSaga from "./SnackSaga";
import * as StaffSaga from "./StaffSaga";
import * as TransactionSaga from "./TransactionSaga";
import * as UserSaga from "./UserSaga";

export default function* rootSaga() {
  yield all([
    //User
    UserSaga.loginSaga(),
    UserSaga.resetPasswordSaga(),
    UserSaga.changePasswordSaga(),
    //Movie
    MovieSaga.getMoviesSaga(),
    MovieSaga.addMovieSaga(),
    MovieSaga.updateMovieSaga(),
    MovieSaga.deleteMovieSaga(),
    MovieSaga.getDataForMovieSaga(),
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
    //RoomTypes
    RoomTypeSaga.getRoomTypesSaga(),
    RoomTypeSaga.addRoomTypeSaga(),
    RoomTypeSaga.updateRoomTypeSaga(),
    RoomTypeSaga.deleteRoomTypeSaga(),
    //Staffs
    StaffSaga.getStaffsSaga(),
    StaffSaga.addStaffSaga(),
    StaffSaga.updateStaffSaga(),
    StaffSaga.deleteStaffSaga(),
    //Posts
    PostSaga.getAllPostsSaga(),
    PostSaga.getMyPostsSaga(),
    PostSaga.addPostSaga(),
    PostSaga.updatePostSaga(),
    PostSaga.deletePostSaga(),
    //Room
    RoomSaga.getRoomsSaga(),
    RoomSaga.getRoomByIdSaga(),
    RoomSaga.addRoomSaga(),
    RoomSaga.updateRoomSaga(),
    RoomSaga.deleteRoomSaga(),
    RoomSaga.getDataForRoomSaga(),
    //Show time
    ShowTimeSaga.getShowTimesByDateSaga(),
    ShowTimeSaga.addShowTimeSaga(),
    ShowTimeSaga.updateShowTimeSaga(),
    ShowTimeSaga.deleteShowTimeSaga(),
    ShowTimeSaga.getDataForShowTimeSaga(),
    // Transaction
    TransactionSaga.getTransactionsSaga(),
    TransactionSaga.getDataForTransactionSaga(),
    TransactionSaga.addTransactionSaga(),
    //Image
    ImageSaga.postImageSaga(),
  ]);
}
