import { faker } from "@faker-js/faker";
import IActor from "~/interfaces/actor.interface";

const actors: IActor[] = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  birthday: faker.date.past(),
  nation: faker.address.country(),
  story: "",
  images: [
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/990DC4A151E0D8C69EBDEB5662A9AA6808A5609B1A3734620A457ACD0B4A04BB/scale?width=1200&aspectRatio=1.78&format=jpeg",
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/990DC4A151E0D8C69EBDEB5662A9AA6808A5609B1A3734620A457ACD0B4A04BB/scale?width=1200&aspectRatio=1.78&format=jpeg",
  ],
  slug: "",
}));

export default actors;
