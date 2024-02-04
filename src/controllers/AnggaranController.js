import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAnggaranPagu = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await prisma.anggaran.findUnique({
      where: {
        tahun: Number(id),
      },
      select: {
        totalPagu: true,
        tahun: true,
      },
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.send("err");
  }
};
