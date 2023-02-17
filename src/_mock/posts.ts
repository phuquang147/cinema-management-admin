import { faker } from "@faker-js/faker";
import IPost from "~/interfaces/post.interface";

const posts: IPost[] = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(),
  content: "",
  author: {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    avatar: "https://i.pravatar.cc/300",
  },
  cover:
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/990DC4A151E0D8C69EBDEB5662A9AA6808A5609B1A3734620A457ACD0B4A04BB/scale?width=1200&aspectRatio=1.78&format=jpeg",
  createdAt: faker.date.recent(),
  view: 12,
  slug: "",
}));

export default posts;
