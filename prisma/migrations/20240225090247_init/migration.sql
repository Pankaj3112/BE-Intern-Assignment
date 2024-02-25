/*
  Warnings:

  - Added the required column `priceText` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "priceText" TEXT NOT NULL;
