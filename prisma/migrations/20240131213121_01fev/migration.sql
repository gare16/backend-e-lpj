/*
  Warnings:

  - The values [SUPER_ADMIN,ADMIN,USER] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[first_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('super_admin', 'admin', 'user');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Roles_new" USING ("role"::text::"Roles_new");
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "Roles_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Laporan" DROP CONSTRAINT "Laporan_authorName_fkey";

-- DropForeignKey
ALTER TABLE "Laporan" DROP CONSTRAINT "Laporan_verifikatorName_fkey";

-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "agama" TEXT,
ADD COLUMN     "alamat" TEXT,
ADD COLUMN     "birth_day" TIMESTAMP(3),
ADD COLUMN     "daerah" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "hobby" TEXT,
ADD COLUMN     "img_url" TEXT,
ADD COLUMN     "jenis_kelamin" TEXT,
ADD COLUMN     "kecamatan" TEXT,
ADD COLUMN     "kelurahan" TEXT,
ADD COLUMN     "kode_pos" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "nomor_hp" TEXT,
ADD COLUMN     "posisi" TEXT,
ADD COLUMN     "provinsi" TEXT,
ALTER COLUMN "role" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Ralat" (
    "id" SERIAL NOT NULL,
    "ralat" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "kesalahan" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "idRalat" INTEGER,
    "userInput" TEXT,

    CONSTRAINT "Ralat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_first_name_key" ON "User"("first_name");

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User"("first_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_verifikatorName_fkey" FOREIGN KEY ("verifikatorName") REFERENCES "User"("first_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ralat" ADD CONSTRAINT "Ralat_idRalat_fkey" FOREIGN KEY ("idRalat") REFERENCES "Laporan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ralat" ADD CONSTRAINT "Ralat_userInput_fkey" FOREIGN KEY ("userInput") REFERENCES "User"("first_name") ON DELETE SET NULL ON UPDATE CASCADE;
