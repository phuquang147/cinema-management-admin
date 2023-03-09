import { faker } from "@faker-js/faker";
import { ISeat } from "~/interfaces/seat.interface";

const SEAT_TYPES = ["single", "couple", "none"];

const seats: ISeat[][] = [...Array(8)].map((_, rowIndex) =>
  [...Array(20)].map((_, colIndex) => ({
    id: faker.datatype.uuid(),
    number: `${rowIndex}${colIndex}`,
    type: faker.helpers.arrayElement(SEAT_TYPES),
  }))
);

export default seats;
