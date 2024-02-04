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

export const createAnggaran = async (req, res) => {
  const { totalPagu } = req.body.data;
  try {
    const result = await prisma.anggaran.create({
      data: {
        tahun: 2024,
        totalPagu: totalPagu,
      },
    });
    res.status(200).json({
      message: "Done",
    });
  } catch (error) {
    res.send("err");
  }
};

export const updateAnggaran = async (req, res) => {
  const { totalPagu } = req.body.data;
  try {
    const result = await prisma.anggaran.update({
      where: {
        tahun: 2024,
      },
      data: {
        totalPagu: totalPagu,
      },
    });
    res.status(201).json({
      message: "Done",
    });
  } catch (error) {
    console.log("Logging Error", error);
    res.send("err");
  }
};
