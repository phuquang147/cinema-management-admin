export interface ITicket {
  _id: string;
  ticketId: {
    _id: string;
    isBooked: boolean;
    price: number;
    seat: {
      _id: string;
      name: string;
      type: string;
      position: "left" | "right";
    };
  };
}
