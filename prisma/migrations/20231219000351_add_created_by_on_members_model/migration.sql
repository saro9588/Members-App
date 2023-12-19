/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Member` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Member_creatorId_idx` ON `Member`;

-- AlterTable
ALTER TABLE `Member` DROP COLUMN `creatorId`,
    ADD COLUMN `createdBy` TEXT NOT NULL;
