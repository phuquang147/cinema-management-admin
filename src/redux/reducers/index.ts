import ActorReducer from "./ActorReducer";
import BookingReducer from "./BookingReducer";
import GenreReducer from "./GenreReducer";
import LoadingReducer from "./LoadingReducer";
import MovieReducer from "./MovieReducer";
import PostReducer from "./PostReducer";
import ReportReducer from "./ReportReducer";
import RoomReducer from "./RoomReducer";
import RoomTypeReducer from "./RoomTypeReducer";
import ShowTimeReducer from "./ShowTimeReducer";
import SnackReducer from "./SnackReducer";
import StaffReducer from "./StaffReducer";
import TransactionReducer from "./TransactionReducer";
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
  booking: BookingReducer,
  transaction: TransactionReducer,
  report: ReportReducer,
};

export default rootReducer;
