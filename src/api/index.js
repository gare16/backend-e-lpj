import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "../router/Router.js";
import multer from "multer";
import { PrismaClient } from "@prisma/client";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./files");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

app.get("/", function (req, res) {
  res.status(200).json({
    message: "Success...",
  });
});

app.post("/upload/:id", upload.single("data[file]"), async (req, res) => {
  const { filename } = req.file;
  const { deskripsi } = req.body.data;
  const id = req.params.id;

  try {
    const result = await prisma.uploadFile.create({
      data: {
        idLaporan: Number(id),
        url: filename,
        deskripsi: deskripsi,
      },
    });
    res.send({
      Message: "File Uploaded",
    });
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

app.post("/upload-surat", upload.single("data[file]"), async (req, res) => {
  const { filename } = req.file;
  const { deskripsi, keterangan } = req.body.data;

  try {
    const result = await prisma.surat.create({
      data: {
        url: filename,
        deskripsi: deskripsi,
        tipe: "PDF",
        keterangan: keterangan,
      },
    });
    res.send({
      Message: "File Uploaded",
    });
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

app.listen(port, () => console.log(`Listen PORT : ${port}`));
