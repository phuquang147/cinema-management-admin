export default interface IShowTime {
  _id: string;
  startTime: string;
  endTime: string;
  duration: number;
  room: { _id: string; name: string };
  movie: { _id: string; name: string; duration: number; thumbnail: string };
  singlePrice: number;
  doublePrice: number;
}
