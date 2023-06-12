export default interface IMovie {
  _id: string;
  name: string;
  description: string;
  genres: { id: string; name: string }[];
  actors: { id: string; name: string }[];
  director: string;
  thumbnail: string;
  images: string[];
  time: number;
  year: number;
  premiereDay: string;
  endDay: string;
  language: string;
  trailer: string;
  slug: string;
}
