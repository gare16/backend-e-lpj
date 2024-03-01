import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLaporan = async (req, res) => {
  const searchValue = req.query.search || "";
  const currentPage = req.query.currentPage || 0;
  const nextPage = req.query.nextPage || 10;

  try {
    const result = await prisma.laporan.findMany({
      skip: parseInt(currentPage),
      take: parseInt(nextPage),
      where: {
        // {
        //   kode_mak: searchValue
        //     ? {
        //         contains: searchValue,
        //         mode: "insensitive",
        //       }
        //     : {
        //         not: "",
        //       },
        // },
        // {
        //   deskripsi: searchValue
        //     ? {
        //         contains: searchValue,
        //         mode: "insensitive",
        //       }
        //     : {
        //         not: "",
        //       },
        // },

        tanggal_pengajuan: {
          gte: new Date("2024-01-01"),
          lte: new Date("2024-01-30"),
        },
      },
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("err");
  }
};

export const getLaporanOrderedBy = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await prisma.laporan.findMany({
      where: {
        tanggal_pengajuan: {},
      },
    });
    console.log(result);
    res.status(200).json({
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

export const getLaporanById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await prisma.laporan.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        deskripsi: true,
        kode_mak: true,
        nilai_lpj: true,
        tanggal_pengajuan: true,
        kuitansi: true,
        undangan: true,
        daftar_hadir: true,
        notulensi: true,
        dokumentasi: true,
        paparan: true,
        rpa: true,
        surat_tugas: true,
        spd: true,
        sppd: true,
        sp_pengeluaran: true,
        sptj_mutlak: true,
        copy_personal: true,
        boarding_pass: true,
        kwitansi_hotel: true,
        form_ppd: true,
        copy_paspor: true,
        copy_spk: true,
        ba_serah_terima: true,
        ba_pembayaran: true,
        faktur_pajak: true,
        bp_apbn: true,
        garansi_bank: true,
        honor: true,
      },
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const createLaporan = async (req, res) => {
  // const n = Number(datas.nilai_lpj);
  const option1 = {
    authorName: req.body.data.authorName,
    status: "On Progress",
    kode_mak: req.body.data.kode_mak,
    nilai_lpj: Number(req.body.data.nilai_lpj),
    tanggal_pengajuan: req.body.data.tanggal_pengajuan,
    tanggal_selesai: req.body.data.tanggal_selesai,
    deskripsi: req.body.data.deskripsi,
    kuitansi: false,
    undangan: false,
    daftar_hadir: false,
    notulensi: false,
    dokumentasi: false,
  };

  const option2 = {
    authorName: req.body.data.authorName,
    status: "On Progress",
    kode_mak: req.body.data.kode_mak,
    nilai_lpj: Number(req.body.data.nilai_lpj),
    tanggal_pengajuan: req.body.data.tanggal_pengajuan,
    tanggal_selesai: req.body.data.tanggal_selesai,
    deskripsi: req.body.data.deskripsi,
    kuitansi: false,
    dokumentasi: false,
    faktur_pajak: false,
    bp_apbn: false,
  };

  const option3 = {
    authorName: req.body.data.authorName,
    status: "On Progress",
    kode_mak: req.body.data.kode_mak,
    nilai_lpj: Number(req.body.data.nilai_lpj),
    tanggal_pengajuan: req.body.data.tanggal_pengajuan,
    tanggal_selesai: req.body.data.tanggal_selesai,
    deskripsi: req.body.data.deskripsi,
    kuitansi: false,
    dokumentasi: false,
    copy_spk: false,
    ba_serah_terima: false,
    ba_pembayaran: false,
    faktur_pajak: false,
    bp_apbn: false,
    garansi_bank: false,
  };

  const option4 = {
    authorName: req.body.data.authorName,
    status: "On Progress",
    kode_mak: req.body.data.kode_mak,
    nilai_lpj: Number(req.body.data.nilai_lpj),
    tanggal_pengajuan: req.body.data.tanggal_pengajuan,
    tanggal_selesai: req.body.data.tanggal_selesai,
    deskripsi: req.body.data.deskripsi,
    kuitansi: false,
    undangan: false,
    daftar_hadir: false,
    paparan: false,
    rpa: false,
    sptj_mutlak: false,
    copy_personal: false,
    bp_apbn: false,
  };

  const option5 = {
    authorName: req.body.data.authorName,
    status: "On Progress",
    kode_mak: req.body.data.kode_mak,
    nilai_lpj: Number(req.body.data.nilai_lpj),
    tanggal_pengajuan: req.body.data.tanggal_pengajuan,
    tanggal_selesai: req.body.data.tanggal_selesai,
    deskripsi: req.body.data.deskripsi,
    kuitansi: false,
    daftar_hadir: false,
    notulensi: false,
    rpa: false,
    copy_spk: false,
    ba_serah_terima: false,
    ba_pembayaran: false,
    bp_apbn: false,
    garansi_bank: false,
    honor: false,
  };

  const option6 = {
    authorName: req.body.data.authorName,
    status: "On Progress",
    kode_mak: req.body.data.kode_mak,
    nilai_lpj: Number(req.body.data.nilai_lpj),
    tanggal_pengajuan: req.body.data.tanggal_pengajuan,
    tanggal_selesai: req.body.data.tanggal_selesai,
    deskripsi: req.body.data.deskripsi,
    kuitansi: false,
    undangan: false,
    notulensi: false,
    dokumentasi: false,
    surat_tugas: false,
    spd: false,
    sppd: false,
    sp_pengeluaran: false,
    sptj_mutlak: false,
    boarding_pass: false,
    kwitansi_hotel: false,
  };

  const option7 = {
    authorName: req.body.data.authorName,
    status: "On Progress",
    kode_mak: req.body.data.kode_mak,
    nilai_lpj: Number(req.body.data.nilai_lpj),
    tanggal_pengajuan: req.body.data.tanggal_pengajuan,
    tanggal_selesai: req.body.data.tanggal_selesai,
    deskripsi: req.body.data.deskripsi,
    kuitansi: false,
    undangan: false,
    notulensi: false,
    dokumentasi: false,
    paparan: false,
    surat_tugas: false,
    form_ppd: false,
  };

  const option8 = {
    authorName: req.body.data.authorName,
    status: "On Progress",
    kode_mak: req.body.data.kode_mak,
    nilai_lpj: Number(req.body.data.nilai_lpj),
    tanggal_pengajuan: req.body.data.tanggal_pengajuan,
    tanggal_selesai: req.body.data.tanggal_selesai,
    deskripsi: req.body.data.deskripsi,
    kuitansi: false,
    undangan: false,
    daftar_hadir: false,
    notulensi: false,
    dokumentasi: false,
    copy_spk: false,
    ba_serah_terima: false,
    ba_pembayaran: false,
  };

  const option9 = {
    authorName: req.body.data.authorName,
    status: "On Progress",
    kode_mak: req.body.data.kode_mak,
    nilai_lpj: Number(req.body.data.nilai_lpj),
    tanggal_pengajuan: req.body.data.tanggal_pengajuan,
    tanggal_selesai: req.body.data.tanggal_selesai,
    deskripsi: req.body.data.deskripsi,
    kuitansi: false,
    undangan: false,
    notulensi: false,
    dokumentasi: false,
    surat_tugas: false,
    spd: false,
    sppd: false,
    sp_pengeluaran: false,
    sptj_mutlak: false,
    boarding_pass: false,
    kwitansi_hotel: false,
  };

  const option10 = {
    authorName: req.body.data.authorName,
    status: "On Progress",
    kode_mak: req.body.data.kode_mak,
    nilai_lpj: Number(req.body.data.nilai_lpj),
    tanggal_pengajuan: req.body.data.tanggal_pengajuan,
    tanggal_selesai: req.body.data.tanggal_selesai,
    deskripsi: req.body.data.deskripsi,
    kuitansi: false,
    undangan: false,
    notulensi: false,
    dokumentasi: false,
    surat_tugas: false,
    spd: false,
    sppd: false,
    sp_pengeluaran: false,
    sptj_mutlak: false,
    boarding_pass: false,
    kwitansi_hotel: false,
    form_ppd: false,
    copy_paspor: false,
  };

  const option11 = {
    authorName: req.body.data.authorName,
    status: "On Progress",
    kode_mak: req.body.data.kode_mak,
    nilai_lpj: Number(req.body.data.nilai_lpj),
    tanggal_pengajuan: req.body.data.tanggal_pengajuan,
    tanggal_selesai: req.body.data.tanggal_selesai,
    deskripsi: req.body.data.deskripsi,
    kuitansi: false,
    dokumentasi: false,
    copy_spk: false,
    ba_serah_terima: false,
    ba_pembayaran: false,
    faktur_pajak: false,
    bp_apbn: false,
    garansi_bank: false,
  };

  const { nilai_lpj } = req.body.data;

  try {
    const pagu = await prisma.anggaran.findUnique({
      where: {
        tahun: 2024,
      },
      select: {
        totalPagu: true,
      },
    });
    const total = pagu.totalPagu;
    await prisma.anggaran.update({
      where: {
        tahun: 2024,
      },
      data: {
        totalPagu: total - nilai_lpj,
      },
    });
    const inputX = req.body.data.kode_mak;
    inputX === "521211"
      ? await prisma.laporan.create({
          data: option1,
        })
      : inputX === "521811"
      ? await prisma.laporan.create({
          data: option2,
        })
      : inputX === "522141"
      ? await prisma.laporan.create({
          data: option3,
        })
      : inputX === "522151"
      ? await prisma.laporan.create({
          data: option4,
        })
      : inputX === "522191"
      ? await prisma.laporan.create({
          data: option5,
        })
      : inputX === "524111"
      ? await prisma.laporan.create({
          data: option6,
        })
      : inputX === "524113"
      ? await prisma.laporan.create({
          data: option7,
        })
      : inputX === "524114"
      ? await prisma.laporan.create({
          data: option8,
        })
      : inputX === "524119"
      ? await prisma.laporan.create({
          data: option9,
        })
      : inputX === "524219"
      ? await prisma.laporan.create({
          data: option10,
        })
      : await prisma.laporan.create({
          data: option11,
        });
    res.status(201).json({
      message: "Laporan telah dibuat!",
    });
  } catch (error) {
    res.send(error);
  }
};

export const deleteLaporan = async (req, res) => {
  const { props } = req.body.data;
  const { tahun } = req.body.data;
  try {
    const getLaporan = await prisma.laporan.findMany({
      where: {
        id: {
          in: props,
        },
      },
      select: {
        nilai_lpj: true,
      },
    });

    const mapped = getLaporan.map((d) => {
      return d.nilai_lpj;
    });

    const reduced = mapped.reduce((a, b) => a + b);

    const currentAnggaran = await prisma.anggaran.findFirst({
      where: {
        tahun: 2024,
      },
      select: {
        totalPagu: true,
      },
    });
    const totalPagu = currentAnggaran.totalPagu + reduced;
    const [laporan, anggaran] = await prisma.$transaction([
      prisma.laporan.deleteMany({
        where: {
          id: {
            in: props,
          },
        },
      }),
      prisma.anggaran.update({
        where: {
          tahun: 2024,
        },
        data: {
          totalPagu: totalPagu,
        },
      }),
    ]);
    res.status(200).json({
      message: "Laporan berhasil di Hapus",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const updateLaporan = async (req, res) => {
  const update1 = {
    verifikatorName: req.body.data.verifikatorName,
    updatedAt: req.body.data.updatedAt,
    kuitansi: req.body.data.datas[1].col_1,
    undangan: req.body.data.datas[2].col_1,
    daftar_hadir: req.body.data.datas[3].col_1,
    notulensi: req.body.data.datas[4].col_1,
    dokumentasi: req.body.data.datas[5].col_1,
  };

  const update2 = {
    verifikatorName: req.body.data.verifikatorName,
    updatedAt: req.body.data.updatedAt,
    kuitansi: req.body.data.datas[1].col_2,
    dokumentasi: req.body.data.datas[5].col_2,
    faktur_pajak: req.body.data.datas[21].col_2,
    bp_apbn: req.body.data.datas[22].col_2,
  };

  const update3 = {
    verifikatorName: req.body.data.verifikatorName,
    updatedAt: req.body.data.updatedAt,
    kuitansi: req.body.data.datas[1].col_3,
    dokumentasi: req.body.data.datas[5].col_3,
    copy_spk: req.body.data.datas[18].col_3,
    ba_serah_terima: req.body.data.datas[19].col_3,
    ba_pembayaran: req.body.data.datas[20].col_3,
    faktur_pajak: req.body.data.datas[21].col_3,
    bp_apbn: req.body.data.datas[22].col_3,
    garansi_bank: req.body.data.datas[23].col_3,
  };

  const update4 = {
    verifikatorName: req.body.data.verifikatorName,
    updatedAt: req.body.data.updatedAt,
    kuitansi: req.body.data.datas[1].col_4,
    undangan: req.body.data.datas[2].col_4,
    daftar_hadir: req.body.data.datas[3].col_4,
    paparan: req.body.data.datas[6].col_4,
    rpa: req.body.data.datas[7].col_4,
    sptj_mutlak: req.body.data.datas[12].col_4,
    copy_personal: req.body.data.datas[13].col_4,
    bp_apbn: req.body.data.datas[22].col_4,
  };

  const update5 = {
    verifikatorName: req.body.data.verifikatorName,
    updatedAt: req.body.data.updatedAt,
    kuitansi: req.body.data.datas[1].col_5,
    daftar_hadir: req.body.data.datas[3].col_5,
    notulensi: req.body.data.datas[4].col_5,
    rpa: req.body.data.datas[7].col_5,
    copy_spk: req.body.data.datas[18].col_5,
    ba_serah_terima: req.body.data.datas[19].col_5,
    ba_pembayaran: req.body.data.datas[20].col_5,
    bp_apbn: req.body.data.datas[22].col_5,
    garansi_bank: req.body.data.datas[23].col_5,
    honor: req.body.data.datas[24].col_5,
  };

  const update6 = {
    verifikatorName: req.body.data.verifikatorName,
    updatedAt: req.body.data.updatedAt,
    kuitansi: req.body.data.datas[1].col_6,
    undangan: req.body.data.datas[2].col_6,
    notulensi: req.body.data.datas[4].col_6,
    dokumentasi: req.body.data.datas[5].col_6,
    surat_tugas: req.body.data.datas[8].col_6,
    spd: req.body.data.datas[9].col_6,
    sppd: req.body.data.datas[10].col_6,
    sp_pengeluaran: req.body.data.datas[11].col_6,
    sptj_mutlak: req.body.data.datas[12].col_6,
    boarding_pass: req.body.data.datas[14].col_6,
    kwitansi_hotel: req.body.data.datas[15].col_6,
  };

  const update7 = {
    verifikatorName: req.body.data.verifikatorName,
    updatedAt: req.body.data.updatedAt,
    kuitansi: req.body.data.datas[1].col_7,
    undangan: req.body.data.datas[2].col_7,
    notulensi: req.body.data.datas[4].col_7,
    dokumentasi: req.body.data.datas[5].col_7,
    paparan: req.body.data.datas[6].col_7,
    surat_tugas: req.body.data.datas[8].col_7,
    form_ppd: req.body.data.datas[16].col_7,
  };

  const update8 = {
    verifikatorName: req.body.data.verifikatorName,
    updatedAt: req.body.data.updatedAt,
    kuitansi: req.body.data.datas[1].col_8,
    undangan: req.body.data.datas[2].col_8,
    daftar_hadir: req.body.data.datas[3].col_8,
    notulensi: req.body.data.datas[4].col_8,
    dokumentasi: req.body.data.datas[5].col_8,
    copy_spk: req.body.data.datas[18].col_8,
    ba_serah_terima: req.body.data.datas[19].col_8,
    ba_pembayaran: req.body.data.datas[20].col_8,
  };

  const update9 = {
    verifikatorName: req.body.data.verifikatorName,
    updatedAt: req.body.data.updatedAt,
    kuitansi: req.body.data.datas[1].col_9,
    undangan: req.body.data.datas[2].col_9,
    notulensi: req.body.data.datas[4].col_9,
    dokumentasi: req.body.data.datas[5].col_9,
    surat_tugas: req.body.data.datas[8].col_9,
    spd: req.body.data.datas[9].col_9,
    sppd: req.body.data.datas[10].col_9,
    sp_pengeluaran: req.body.data.datas[11].col_9,
    sptj_mutlak: req.body.data.datas[12].col_9,
    boarding_pass: req.body.data.datas[14].col_9,
    kwitansi_hotel: req.body.data.datas[15].col_9,
  };

  const update10 = {
    verifikatorName: req.body.data.verifikatorName,
    updatedAt: req.body.data.updatedAt,
    kuitansi: req.body.data.datas[1].col_10,
    undangan: req.body.data.datas[2].col_10,
    notulensi: req.body.data.datas[4].col_10,
    dokumentasi: req.body.data.datas[5].col_10,
    surat_tugas: req.body.data.datas[8].col_10,
    spd: req.body.data.datas[9].col_10,
    sppd: req.body.data.datas[10].col_10,
    sp_pengeluaran: req.body.data.datas[11].col_10,
    sptj_mutlak: req.body.data.datas[12].col_10,
    boarding_pass: req.body.data.datas[14].col_10,
    kwitansi_hotel: req.body.data.datas[15].col_10,
    form_ppd: req.body.data.datas[16].col_10,
    copy_paspor: req.body.data.datas[17].col_10,
  };

  const update11 = {
    verifikatorName: req.body.data.verifikatorName,
    updatedAt: req.body.data.updatedAt,
    kuitansi: req.body.data.datas[1].col_11,
    dokumentasi: req.body.data.datas[5].col_11,
    copy_spk: req.body.data.datas[18].col_11,
    ba_serah_terima: req.body.data.datas[19].col_11,
    ba_pembayaran: req.body.data.datas[20].col_11,
    faktur_pajak: req.body.data.datas[21].col_11,
    bp_apbn: req.body.data.datas[22].col_11,
    garansi_bank: req.body.data.datas[23].col_11,
  };

  const id = req.params.id;
  try {
    const kode = await prisma.laporan.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        kode_mak: true,
      },
    });

    const kodeX = kode.kode_mak.toString();
    kodeX === "521211"
      ? await prisma.laporan.update({
          where: {
            id: Number(id),
          },
          data: update1,
        })
      : kodeX === "521811"
      ? await prisma.laporan.update({
          where: {
            id: Number(id),
          },
          data: update2,
        })
      : kodeX === "522141"
      ? await prisma.laporan.update({
          where: {
            id: Number(id),
          },
          data: update3,
        })
      : kodeX === "522151"
      ? await prisma.laporan.update({
          where: {
            id: Number(id),
          },
          data: update4,
        })
      : kodeX === "522191"
      ? await prisma.laporan.update({
          where: {
            id: Number(id),
          },
          data: update5,
        })
      : kodeX === "524111"
      ? await prisma.laporan.update({
          where: {
            id: Number(id),
          },
          data: update6,
        })
      : kodeX === "524113"
      ? await prisma.laporan.update({
          where: {
            id: Number(id),
          },
          data: update7,
        })
      : kodeX === "524114"
      ? await prisma.laporan.update({
          where: {
            id: Number(id),
          },
          data: update8,
        })
      : kodeX === "524119"
      ? await prisma.laporan.update({
          where: {
            id: Number(id),
          },
          data: update9,
        })
      : kodeX === "524219"
      ? await prisma.laporan.update({
          where: {
            id: Number(id),
          },
          data: update10,
        })
      : await prisma.laporan.update({
          where: {
            id: Number(id),
          },
          data: update11,
        });

    res.send("Done");
  } catch (error) {
    error;
    res.send("Error");
  }
};

export const getLaporanChecking = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await prisma.laporan.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        kode_mak: true,
        tanggal_selesai: true,
        nilai_lpj: true,
        deskripsi: true,
        ba_pembayaran: true,
        ba_serah_terima: true,
        boarding_pass: true,
        bp_apbn: true,
        copy_paspor: true,
        copy_personal: true,
        copy_spk: true,
        daftar_hadir: true,
        dokumentasi: true,
        faktur_pajak: true,
        form_ppd: true,
        garansi_bank: true,
        honor: true,
        kuitansi: true,
        kwitansi_hotel: true,
        notulensi: true,
        paparan: true,
        rpa: true,
        sp_pengeluaran: true,
        spd: true,
        sppd: true,
        sptj_mutlak: true,
        surat_tugas: true,
        undangan: true,
      },
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const getSummary = async (req, res) => {
  const pengajuan =
    await prisma.$queryRaw(Prisma.sql`SELECT substring(e.x, 1, 2) as "month" ,count(a.id) as data FROM (select to_char((current_date + interval '1 month' * a),'mm-yyyy') AS x FROM generate_series(0,11) AS s(a)) e left join ( SELECT id,to_char("createdAt",'MM-YYYY') as xx FROM "Laporan" ) a on a.xx = e.x group by e.x order by 1;
    `);

  pengajuan.forEach((v) => {
    v.data = Number(v.data);
  });
  const upload = pengajuan.map((da) => {
    return da.data;
  });
  const ralat =
    await prisma.$queryRaw(Prisma.sql`SELECT substring(e.x, 1, 2) as "month" ,count(a.id) as data FROM (select to_char((current_date + interval '1 month' * a),'mm-yyyy') AS x FROM generate_series(0,11) AS s(a)) e left join ( SELECT id,to_char("updatedAt",'MM-YYYY') as xx FROM "Laporan" ) a on a.xx = e.x group by e.x order by 1;
  `);
  ralat.forEach((v) => {
    v.data = Number(v.data);
  });
  const ubah = ralat.map((a) => {
    return a.data;
  });
  const summary = [
    {
      name: "Pengajuan",
      data: upload,
    },
    {
      name: "Ralat",
      data: ubah,
    },
  ];
  res.status(200).json({
    data: summary,
  });
};

export const getRalatLaporanById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await prisma.laporan.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        ralat: true,
      },
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.send("err");
  }
};

export const createRalat = async (req, res) => {
  const data = req.body.data;
  try {
    const createRalat = await prisma.ralat.create({
      data: data.data,
    });
    const setStatus = await prisma.laporan.update({
      where: {
        id: parseInt(data.data.idLaporan),
      },
      data: {
        status: data.status,
      },
    });
    res.send("created");
  } catch (error) {
    res.send("err");
  }
};

export const setLaporanStatus = async (req, res) => {
  const id = req.params.id;
  const { status, verifikatorName } = req.body.data;
  try {
    const result = await prisma.laporan.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: status,
        verifikatorName: verifikatorName,
      },
    });
    res.status(200).json({
      message: "Done",
    });
  } catch (error) {
    res.send("err");
  }
};
