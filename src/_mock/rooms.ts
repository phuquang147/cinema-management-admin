import { faker } from "@faker-js/faker";
import IRoom from "~/interfaces/room.interface";

const roomTypes = ["2D", "3D", "IMAX", "4DX"];

const rooms: IRoom[] = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.word(),
  roomTypes: faker.helpers.arrayElements(roomTypes),
}));

export default rooms;
