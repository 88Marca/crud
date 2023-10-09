/*
  Warnings:

  - You are about to alter the column `latitud` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,15)` to `Decimal(21,18)`.
  - You are about to alter the column `longitud` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,15)` to `Decimal(21,18)`.

*/
-- AlterTable
ALTER TABLE `company` MODIFY `latitud` DECIMAL(21, 18) NULL,
    MODIFY `longitud` DECIMAL(21, 18) NULL;
