import { faker } from "@faker-js/faker";
import IMovie from "~/interfaces/movie.interface";

const GENRES = [
  {
    id: faker.datatype.uuid(),
    name: "Hành động",
  },
  {
    id: faker.datatype.uuid(),
    name: "Phiêu lưu",
  },
];

const ACTORS = [
  {
    id: faker.datatype.uuid(),
    name: "Actor 1",
  },
  {
    id: faker.datatype.uuid(),
    name: "Actor 2",
  },
];

const movies: IMovie[] = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  description: faker.lorem.paragraph(),
  genres: faker.helpers.arrayElements(GENRES),
  actors: faker.helpers.arrayElements(ACTORS),
  director: faker.name.fullName(),
  thumbnail:
    "https://lumiere-a.akamaihd.net/v1/images/p_onward_19732_09862641.jpeg",
  images: [
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/990DC4A151E0D8C69EBDEB5662A9AA6808A5609B1A3734620A457ACD0B4A04BB/scale?width=1200&aspectRatio=1.78&format=jpeg",
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/990DC4A151E0D8C69EBDEB5662A9AA6808A5609B1A3734620A457ACD0B4A04BB/scale?width=1200&aspectRatio=1.78&format=jpeg",
  ],
  duration: 110,
  year: 2023,
  premiereDay: faker.date.soon(),
  endDay: faker.date.future(),
  language: "Tiếng Việt",
  trailer: "FVuqNi0inPE",
  slug: "",
}));

export default movies;
