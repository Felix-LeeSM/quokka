import { PrismaClient } from "@prisma/client";
import { seedAirports } from "./airport/airport.seed";
import { seedUsers } from "./user/user.seed";
import { seedGroups } from "./user/group.seed";

const $prisma = new PrismaClient();

const main = async () => {
  $prisma.$connect();
  const users = await seedUsers($prisma);
  const groups = await seedGroups($prisma, users);
  const airports = await seedAirports($prisma);
};

main().finally(() => {
  $prisma.$disconnect();
});
