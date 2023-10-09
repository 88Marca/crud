/*
  Warnings:

  - You are about to alter the column `latitud` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(21,18)` to `Decimal(24,21)`.
  - You are about to alter the column `longitud` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(21,18)` to `Decimal(24,21)`.

*/
-- AlterTable
ALTER TABLE `company` MODIFY `latitud` DECIMAL(24, 21) NULL,
    MODIFY `longitud` DECIMAL(24, 21) NULL;
