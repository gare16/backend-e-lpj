-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Laporan" (
    "id" SERIAL NOT NULL,
    "tanggal_pengajuan" TIMESTAMP(3) NOT NULL,
    "tanggal_selesai" TIMESTAMP(3) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kode_mak" INTEGER NOT NULL,
    "nilai_lpj" INTEGER NOT NULL,
    "tipe" TEXT,
    "tipe_deskripsi" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "authorName" TEXT,
    "ba_pembayaran" BOOLEAN,
    "ba_serah_terima" BOOLEAN,
    "boarding_pass" BOOLEAN,
    "bp_apbn" BOOLEAN,
    "copy_paspor" BOOLEAN,
    "copy_personal" BOOLEAN,
    "copy_spk" BOOLEAN,
    "daftar_hadir" BOOLEAN,
    "dokumentasi" BOOLEAN,
    "faktur_pajak" BOOLEAN,
    "form_ppd" BOOLEAN,
    "garansi_bank" BOOLEAN,
    "honor" BOOLEAN,
    "kuitansi" BOOLEAN,
    "kwitansi_hotel" BOOLEAN,
    "notulensi" BOOLEAN,
    "paparan" BOOLEAN,
    "rpa" BOOLEAN,
    "sp_pengeluaran" BOOLEAN,
    "spd" BOOLEAN,
    "sppd" BOOLEAN,
    "sptj_mutlak" BOOLEAN,
    "surat_tugas" BOOLEAN,
    "undangan" BOOLEAN,
    "verifikatorName" TEXT,

    CONSTRAINT "Laporan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "Roles" NOT NULL,
    "refresh_token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadFile" (
    "id" SERIAL NOT NULL,
    "idLaporan" INTEGER,
    "deskripsi" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "UploadFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Surat" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "tipe" TEXT,
    "deskripsi" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anggaran" (
    "totalPagu" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "tahun" INTEGER NOT NULL,

    CONSTRAINT "Anggaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Anggaran_tahun_key" ON "Anggaran"("tahun");

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_verifikatorName_fkey" FOREIGN KEY ("verifikatorName") REFERENCES "User"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadFile" ADD CONSTRAINT "UploadFile_idLaporan_fkey" FOREIGN KEY ("idLaporan") REFERENCES "Laporan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
