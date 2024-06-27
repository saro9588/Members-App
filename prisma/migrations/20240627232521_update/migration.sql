/*
  Warnings:

  - You are about to drop the column `createdAT` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAT` on the `Member` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Member` DROP COLUMN `createdAT`,
    DROP COLUMN `updatedAT`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
