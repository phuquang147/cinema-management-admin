import { faker } from "@faker-js/faker";
import IGenre from "~/interfaces/genre.interface";

const genres: IGenre[] = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.sentence(),
}));

export default genres;
