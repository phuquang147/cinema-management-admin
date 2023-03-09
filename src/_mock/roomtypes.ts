import { faker } from "@faker-js/faker";
import IRoomType from "~/interfaces/roomType.interface";

const roomTypes: IRoomType[] = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.sentence(),
}));

export default roomTypes;
