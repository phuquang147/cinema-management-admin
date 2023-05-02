import ActorReducer from "./ActorReducer";
import GenreReducer from "./GenreReducer";
import LoadingReducer from "./LoadingReducer";
import MovieReducer from "./MovieReducer";
import PostReducer from "./PostReducer";
import RoomReducer from "./RoomReducer";
import RoomTypeReducer from "./RoomTypeReducer";
import ShowTimeReducer from "./ShowTimeReducer";
import SnackReducer from "./SnackReducer";
import StaffReducer from "./StaffReducer";
import UserReducer from "./UserReducer";

const rootReducer = {
  loading: LoadingReducer,
  user: UserReducer,
  movie: MovieReducer,
  genre: GenreReducer,
  snack: SnackReducer,
  actor: ActorReducer,
  roomType: RoomTypeReducer,
  staff: StaffReducer,
  post: PostReducer,
  room: RoomReducer,
  showTime: ShowTimeReducer,
};

export default rootReducer;
