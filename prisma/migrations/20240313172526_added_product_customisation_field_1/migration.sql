/*
  Warnings:

  - You are about to drop the column `customisation` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "customisation",
ADD COLUMN     "customisations" JSONB;
