import ActorReducer from "./ActorReducer";
import GenreReducer from "./GenreReducer";
import LoadingReducer from "./LoadingReducer";
import MovieReducer from "./MovieReducer";
import RoomTypeReducer from "./RoomTypeReducer";
import SnackReducer from "./SnackReducer";
import UserReducer from "./UserReducer";

const rootReducer = {
  loading: LoadingReducer,
  user: UserReducer,
  movie: MovieReducer,
  genre: GenreReducer,
  snack: SnackReducer,
  actor: ActorReducer,
  roomType: RoomTypeReducer,
};

export default rootReducer;
