/*
  Warnings:

  - Added the required column `count` to the `AircraftTypeCrewRequirement` table without a default value. This is not possible if the table is not empty.

*/

CREATE DOMAIN unsigned_int AS INTEGER CHECK (VALUE > 0);
 
-- AlterTable
ALTER TABLE "AircraftTypeCrewRequirement" ADD COLUMN "count" unsigned_int NOT NULL;
ALTER TABLE "FlightCrewRequirement" ALTER COLUMN "count" TYPE unsigned_int;