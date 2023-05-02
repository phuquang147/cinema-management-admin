import IRoomType from "./roomType.interface";
import { ISeat } from "./seat.interface";

export default interface IRoom {
  _id: string;
  name: string;
  roomType: IRoomType;
  seats: ISeat[][];
}
