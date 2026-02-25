/*
  Warnings:

  - A unique constraint covering the columns `[nasNumber,userId]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clients_nasNumber_userId_key" ON "clients"("nasNumber", "userId");
