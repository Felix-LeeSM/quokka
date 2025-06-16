/*
  Warnings:

  - Added the required column `groupId` to the `CrewMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CrewMember" ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
