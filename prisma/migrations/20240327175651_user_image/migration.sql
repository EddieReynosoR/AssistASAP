/*
  Warnings:

  - Added the required column `imageUrl` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "imageUrl" TEXT NOT NULL;