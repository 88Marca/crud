/*
  Warnings:

  - You are about to alter the column `latitud` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `Decimal(12,9)`.
  - You are about to alter the column `longitud` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `Decimal(12,9)`.

*/
-- AlterTable
ALTER TABLE `company` MODIFY `latitud` DECIMAL(12, 9) NULL,
    MODIFY `longitud` DECIMAL(12, 9) NULL;
