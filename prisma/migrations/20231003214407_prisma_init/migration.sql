/*
  Warnings:

  - You are about to alter the column `latitud` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,12)` to `Decimal(18,15)`.
  - You are about to alter the column `longitud` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,12)` to `Decimal(18,15)`.

*/
-- AlterTable
ALTER TABLE `company` MODIFY `latitud` DECIMAL(18, 15) NULL,
    MODIFY `longitud` DECIMAL(18, 15) NULL;
