import path from "node:path";
import fs from "node:fs";
import { PrismaClient } from "@prisma/client";

export const seedAirports = async ($prisma: PrismaClient): Promise<void> => {
  return new Promise((res, rej) => {
    fs.readFile(path.join(__dirname, "airport.json"), (err, data) => {
      if (err) return rej(err);

      const airportData = JSON.parse(data.toString()) as {
        iataCode: string;
        name: string;
        city: string;
        timezone: string;
        country: string;
      }[];

      $prisma.airport.createMany({ data: airportData }).then(() => res());
    });
  });
};
