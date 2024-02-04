import { PrismaClient } from "@prisma/client";
import path from "path";

const __dirname = path.resolve();
const prisma = new PrismaClient();

export const getFileUpload = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await prisma.laporan.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        UploadFile: {
          select: {
            id: true,
            idLaporan: true,
            deskripsi: true,
            url: true,
          },
        },
      },
    });

    res.status(200).json({
      result,
    });
  } catch (err) {
    res.send("Err");
  }
};

export const fileViewer = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await prisma.uploadFile.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.setHeader("Content-type", "application/pdf");
    res.set("Content-Disposition", "inline; filename=" + result.url);
    res.sendFile(result.url, { root: path.join(__dirname, "files") });
  } catch (error) {
    console.log(error);
    res.send("err");
  }
};
