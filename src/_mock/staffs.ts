import { faker } from "@faker-js/faker";
import IStaff from "~/interfaces/staff.interface";

const STATUS = ["Đang làm", "Đã nghỉ"];
const GENDER = ["Nam", "Nữ"];

const staffs: IStaff[] = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatar: "",
  name: faker.name.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  gender: faker.helpers.arrayElement(GENDER),
  status: faker.helpers.arrayElement(STATUS),
  address: faker.address.street(),
  birthdate: faker.date.past(),
}));

export default staffs;
