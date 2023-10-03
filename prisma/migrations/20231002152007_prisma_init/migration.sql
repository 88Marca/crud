/*
  Warnings:

  - You are about to drop the column `email` on the `company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `company` DROP COLUMN `email`,
    ADD COLUMN `latitud` DECIMAL(9, 6) NULL,
    ADD COLUMN `longitud` DECIMAL(9, 6) NULL;
