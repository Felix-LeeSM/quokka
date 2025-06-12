/*
  Warnings:

  - You are about to drop the column `typeName` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `airportName` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `rankName` on the `CrewRank` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `AircraftType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CrewRank` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CrewRank` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AircraftType_typeName_key";

-- DropIndex
DROP INDEX "CrewRank_rankName_key";

-- AlterTable
ALTER TABLE "AircraftType" DROP COLUMN "typeName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Airport" DROP COLUMN "airportName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CrewRank" DROP COLUMN "rankName",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AircraftType_name_key" ON "AircraftType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CrewRank_name_key" ON "CrewRank"("name");
