import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { email, password, username, role, first_name } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        username,
        role,
        first_name,
      },
    });
    res.status(201).json({
      msg: "User Created!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body.data;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username: username,
      },
    });
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({
        message: "Username or Password is Wrong!",
      });
    } else {
      const expiresIn = 60 * 60 * 5;
      const secret = process.env.JWT_SECRET;
      const payload = {
        role: user.role,
        username: user.username,
      };
      const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: expiresIn,
      });

      res.status(200).json({
        message: "Login",
        name: user.username,
        role: user.role,
        token,
      });
    }
  } catch (error) {
    res.status(401).json({ message: "Username or Password is Wrong!" });
  }
};

export const getUser = async (req, res) => {
  try {
    const result = await prisma.user.findMany();
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.send("Error", error);
  }
};

export const getUserByName = async (req, res) => {
  const querySearch = req.query.search || "";
  try {
    const result = await prisma.user.findUnique({
      where: {
        username: querySearch,
      },
      select: {
        id: true,
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        tanggal_lahir: true,
        tempat_lahir: true,
        posisi: true,
        nik: true,
        agama: true,
        jenis_kelamin: true,
        hobby: true,
        nomor_hp: true,
        alamat: true,
        provinsi: true,
        daerah: true,
        kecamatan: true,
        kelurahan: true,
        kode_pos: true,
        img_url: true,
        role: true,
      },
    });
    res.status(200).json({
      result: result,
    });
  } catch (error) {
    res.send("err");
  }
};

export const resetPassword = async (req, res) => {
  const id = req.params.id;
  const { password, new_password } = req.body.data;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        password: true,
      },
    });
    const match = await bcrypt.compare(password, user.password);
    const passwordHash = await bcrypt.hash(new_password, 10);
    if (!match) {
      res.status(404).json({ message: "password is not correct!" });
    } else {
      const result = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          password: passwordHash,
        },
      });
      res.send("Done");
    }
  } catch (error) {
    res.send("err");
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { datas } = req.body.data;
  try {
    const result = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: datas,
    });
    res.status(201).json({
      message: "updated!",
    });
  } catch (error) {
    console.log(error);
    res.send("err");
  }
};
