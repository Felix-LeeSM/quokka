/*
  Warnings:

  - Added the required column `count` to the `FlightCrewRequirement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlightCrewRequirement" ADD COLUMN     "count" INTEGER NOT NULL;
