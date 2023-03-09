import { faker } from "@faker-js/faker";
import ISnack from "~/interfaces/snack.interface";

const menu = [
  "/assets/images/aquafina.jpg",
  "/assets/images/combo.jpg",
  "/assets/images/pepsi.png",
  "/assets/images/popcorn.webp",
];

const snacks: ISnack[] = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.sentence(),
  price: faker.datatype.number({ min: 50000, max: 100000 }),
  image: faker.helpers.arrayElement(menu),
}));

export default snacks;
