import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const prisma = new PrismaClient();

export const getSurat = async (req, res) => {
  try {
    const result = await prisma.surat.findMany();
    res.status(200).json({
      result,
    });
  } catch (err) {
    res.send("Err", err);
  }
};

export const deleteSurat = async (req, res) => {
  const id = req.params.id;
  try {
    const filepath = await prisma.surat.findUnique({
      where: {
        id: Number(id),
      },
    });
    fs.unlinkSync(`./files/${filepath.url}`);
    const result = await prisma.surat.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send("Surat Deleted.");
  } catch (error) {
    res.send("Error", error);
  }
};

export const SuratViewer = async (req, res) => {
  const id = req.params.id;
  const result = await prisma.surat.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.setHeader("Content-type", "application/pdf");
  res.set("Content-Disposition", "inline; filename=" + result.url);
  res.sendFile(result.url, { root: path.join(__dirname, "files") });
  // res.download(result.url, { root: path.join(__dirname, "files") });
};
