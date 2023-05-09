export interface ISeat {
  _id: string;
  seatId: { _id: string; type: string; position: "left" | "right" };
}
