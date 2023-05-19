export default interface ITransaction {
  _id: string;
  totalPrice: number;
  createdAt: string;
  items: {
    _id: string;
    id: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
  showTime: {
    movie: string;
    startTime: string;
  };
  staff?: {
    _id: string;
    name: string;
  };
  customer?: {
    _id: string;
    name: string;
  };
  tickets: {
    _id: string;
    price: number;
    seat: {
      _id: string;
      name: string;
    };
  }[];
}
