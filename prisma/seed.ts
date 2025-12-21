import { PrismaClient, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// const userData: Prisma.UserCreateInput[] = [
//   {
//     phone: "1234567891",
//     password: "",
//     randomToken: "token12341",
//   },
//   {
//     phone: "1234567892",
//     password: "",
//     randomToken: "token12342",
//   },
//   {
//     phone: "1234567893",
//     password: "",
//     randomToken: "token12343",
//   },
//   {
//     phone: "1234567894",
//     password: "",
//     randomToken: "token12344",
//   },
//   {
//     phone: "1234567895",
//     password: "",
//     randomToken: "token12345",
//   },
// ];

function createRandomUser() {
  return {
    phone: faker.phone.number({ style: "international" }),
    password: "",
    randomToken: faker.internet.jwt(),
  };
}

export const userData = faker.helpers.multiple(createRandomUser, {
  count: 5,
});

async function main() {
  console.log("Seeding is starting");
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash("12345678", salt);

  for (const user of userData) {
    user.password = hashPassword;
    await prisma.user.create({
      data: user,
    });
  }
  console.log("Seeding completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
