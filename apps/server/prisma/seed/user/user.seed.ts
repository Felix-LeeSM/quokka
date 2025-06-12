import path from "node:path";
import fs from "node:fs";
import * as bcrypt from "bcrypt";
import { User, PrismaClient } from "@prisma/client";

export const seedUsers = (prismaClient: PrismaClient): Promise<User[]> => {
  return new Promise((res, rej) => {
    fs.readFile(path.join(__dirname, "user.json"), (err, data) => {
      if (err) return rej(err);

      bcrypt.hash("aircraft", 10).then((hashedPassword) => {
        const userData = (
          JSON.parse(data.toString()) as {
            username: string;
          }[]
        ).map(({ username }) => ({ username, hashedPassword }));

        return res(
          Promise.all(
            userData.map((user) =>
              prismaClient.user.create({
                data: user,
              }),
            ),
          ),
        );
      });
    });
  });
};
