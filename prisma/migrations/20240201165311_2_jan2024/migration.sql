/*
  Warnings:

  - You are about to drop the column `idRalat` on the `Ralat` table. All the data in the column will be lost.
  - You are about to drop the column `birth_day` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `User` table. All the data in the column will be lost.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Laporan" DROP CONSTRAINT "Laporan_authorName_fkey";

-- DropForeignKey
ALTER TABLE "Laporan" DROP CONSTRAINT "Laporan_verifikatorName_fkey";

-- DropForeignKey
ALTER TABLE "Ralat" DROP CONSTRAINT "Ralat_idRalat_fkey";

-- DropForeignKey
ALTER TABLE "Ralat" DROP CONSTRAINT "Ralat_userInput_fkey";

-- AlterTable
ALTER TABLE "Ralat" DROP COLUMN "idRalat",
ADD COLUMN     "idLaporan" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birth_day",
DROP COLUMN "refresh_token",
ADD COLUMN     "nik" TEXT,
ADD COLUMN     "tanggal_lahir" TIMESTAMP(3),
ADD COLUMN     "tempat_lahir" TEXT,
ALTER COLUMN "role" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_verifikatorName_fkey" FOREIGN KEY ("verifikatorName") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ralat" ADD CONSTRAINT "Ralat_idLaporan_fkey" FOREIGN KEY ("idLaporan") REFERENCES "Laporan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ralat" ADD CONSTRAINT "Ralat_userInput_fkey" FOREIGN KEY ("userInput") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;
