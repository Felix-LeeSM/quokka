import path from "node:path";
import fs from "node:fs";
import { Group, PrismaClient, Role, User } from "@prisma/client";

export const seedGroups = (
  $prisma: PrismaClient,
  users: User[],
): Promise<Group[]> => {
  return new Promise((res, rej) => {
    fs.readFile(path.join(__dirname, "group.json"), (err, data) => {
      if (err) return rej(err);
      const groupData = JSON.parse(data.toString()) as {
        name: string;
        description: string;
      }[];

      Promise.all(
        groupData.map((group) => $prisma.group.create({ data: group })),
      ).then((groups) => {
        const userGroups = groups.flatMap((group) =>
          users.map((user) => ({
            role: Role.ADMIN,
            groupId: group.id,
            userId: user.id,
          })),
        );

        $prisma.userGroup
          .createMany({ data: userGroups })
          .then(() => res(groups));
      });
    });
  });
};
