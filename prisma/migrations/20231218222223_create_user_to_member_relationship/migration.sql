/*
  Warnings:

  - You are about to drop the column `userId` on the `Member` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Member_userId_idx` ON `Member`;

-- AlterTable
ALTER TABLE `Member` DROP COLUMN `userId`,
    ADD COLUMN `creatorId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Member_creatorId_idx` ON `Member`(`creatorId`);

-- CreateIndex
CREATE INDEX `User_id_idx` ON `User`(`id`);
