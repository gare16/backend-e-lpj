import express from "express";
import {
  createUser,
  getUser,
  getUserByName,
  login,
  updateUser,
} from "../controllers/UserController.js";
import {
  createLaporan,
  createRalat,
  deleteLaporan,
  getLaporan,
  getLaporanById,
  getLaporanChecking,
  getRalatLaporanById,
  getSummary,
  setLaporanStatus,
  updateLaporan,
} from "../controllers/LaporanController.js";
import { fileViewer, getFileUpload } from "../controllers/UploadController.js";
import { verifyAuth } from "../middleware/verifyToken.js";
import cookieParser from "cookie-parser";
import {
  SuratViewer,
  deleteSurat,
  getSurat,
} from "../controllers/SuratController.js";
import { getAnggaranPagu } from "../controllers/AnggaranController.js";

const router = express.Router();
const app = express();
app.use(cookieParser());

// Anggraan
router.get("/anggaran/:id", getAnggaranPagu);

// User Router
router.post("/register", createUser);
router.post("/login", login);
router.get("/users", getUser);
router.post("/user/update/:id", updateUser);
router.get("/user", getUserByName);

// Laporan Router
router.get("/laporan", getLaporan);
router.post("/laporan", createLaporan);
router.post("/laporan/delete", deleteLaporan);
router.post("/laporan/status/:id", setLaporanStatus);
router.get("/laporan/:id", getLaporanById);
router.post("/update/:id", updateLaporan);

// Laporan Checking Router
router.get("/checking/:id", getLaporanChecking);

// Ralat Laporan
router.get("/ralat/:id", getRalatLaporanById);
router.post("/ralat", createRalat);
// File Router
router.get("/files/:id", getFileUpload);
router.get("/view/file/:id", fileViewer);

// Surat router
router.get("/view/surat/:id", SuratViewer);
router.get("/surat", getSurat);
router.get("/surat/:id", deleteSurat);

// Summary
router.get("/summary", getSummary);

export default router;
