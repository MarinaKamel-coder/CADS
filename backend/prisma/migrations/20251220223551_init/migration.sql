/*
  Warnings:

  - You are about to drop the column `clerkId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_clerkId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "clerkId",
DROP COLUMN "password",
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
