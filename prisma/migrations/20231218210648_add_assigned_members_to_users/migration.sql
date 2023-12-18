/*
  Warnings:

  - Added the required column `userId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Member` ADD COLUMN `userId` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX `Member_userId_idx` ON `Member`(`userId`);
