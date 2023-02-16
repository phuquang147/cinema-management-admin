export default interface IMovie {
  id: string;
  name: string;
  description: string;
  genres: { id: string; name: string }[];
  actors: { id: string; name: string }[];
  director: string;
  thumbnail: string;
  images: string[];
  duration: number;
  year: number;
  premiereDay: Date;
  endDay: Date;
  language: string;
  trailer: string;
  slug: string;
}
