export default interface Transaction {
  _id: string;
  name: string;
  movieName: string;
  showTime: string;
  bookTime: string;
  seats: string[];
  total: number;
  snacks?: { id: string; name: string; price: number }[];
}
