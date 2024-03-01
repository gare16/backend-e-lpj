import express from "express";
import {
  createUser,
  getUser,
  getUserByName,
  login,
  resetPassword,
  updateUser,
} from "../controllers/UserController.js";
import {
  createLaporan,
  createRalat,
  deleteLaporan,
  getLaporan,
  getLaporanById,
  getLaporanChecking,
  getLaporanOrderedBy,
  getRalatLaporanById,
  getSummary,
  setLaporanStatus,
  updateLaporan,
} from "../controllers/LaporanController.js";
import { fileViewer, getFileUpload } from "../controllers/UploadController.js";
import { verifyAuth, verifyToken } from "../middleware/verifyToken.js";
import cookieParser from "cookie-parser";
import {
  SuratViewer,
  deleteSurat,
  getSurat,
} from "../controllers/SuratController.js";
import {
  createAnggaran,
  getAnggaranPagu,
  updateAnggaran,
} from "../controllers/AnggaranController.js";

const router = express.Router();
const app = express();
app.use(cookieParser());

// Anggraan
router.get("/anggaran/:id", verifyAuth, getAnggaranPagu);
router.post("/anggaran", createAnggaran);
router.post("/anggaran/update", updateAnggaran);

// User Router
router.post("/register", createUser);
router.post("/login", login);
router.post("/user/update/:id", updateUser);
router.post("/user/reset/:id", resetPassword);
router.get("/users", verifyAuth, getUser);
router.get("/user", verifyAuth, getUserByName);

// Laporan Router
router.get("/laporan", verifyAuth, getLaporan);
router.get("/laporan/:id", verifyAuth, getLaporanById);
router.get("/laporan/order/:id", verifyAuth, getLaporanOrderedBy);
router.post("/laporan", createLaporan);
router.post("/laporan/delete", deleteLaporan);
router.post("/laporan/status/:id", setLaporanStatus);
router.post("/update/:id", updateLaporan);

// Laporan Checking Router
router.get("/checking/:id", verifyAuth, getLaporanChecking);

// Ralat Laporan
router.get("/ralat/:id", verifyAuth, getRalatLaporanById);
router.post("/ralat", createRalat);
// File Router
router.get("/files/:id", verifyAuth, getFileUpload);
router.get("/view/file/:id", verifyToken, fileViewer);

// Surat router
router.get("/view/surat/:id", verifyToken, SuratViewer);
router.get("/surat", verifyAuth, getSurat);
router.get("/surat/:id", verifyAuth, deleteSurat);

// Summary
router.get("/summary", verifyAuth, getSummary);

export default router;
