/*
  Warnings:

  - You are about to alter the column `latitud` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,9)` to `Decimal(15,12)`.
  - You are about to alter the column `longitud` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,9)` to `Decimal(15,12)`.

*/
-- AlterTable
ALTER TABLE `company` MODIFY `latitud` DECIMAL(15, 12) NULL,
    MODIFY `longitud` DECIMAL(15, 12) NULL;
