module.exports = {
  queryAddNewDataToCourseDetails: function (
    tableName,
    idSemester,
    idClass,
    idCourse,
    dayValue
  ) {
    return `INSERT INTO ${tableName}
        (MaHocKi, MaLop, MaMonHoc, ThoiGian)
        VALUES('${idSemester}', 
        ${idClass}, 
        ${idCourse}, N'${dayValue}')`;
  },
  queryGetAllValueJoinOtherTable: function () {
    return `SELECT MonHocChiTiet.Diem, MonHocChiTiet.ThoiGian, 
        Lop.*, HocKi.*, MonHoc.*, TaiKhoan.* 
        FROM MonHocChiTiet 
        left join HocKi on MonHocChiTiet.MaHocKi = HocKi.MaHocKi
        left join Lop on MonHocChiTiet.MaLop = Lop.MaLop 
        left join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
		left join TaiKhoan on MonHoc.MaTaiKhoan = TaiKhoan.MaTaiKhoan`;
  },
  queryGetValueJoinOtherTableWithIdClassOfTeacher: function (value) {
    return `SELECT MonHocChiTiet.Diem, MonHocChiTiet.ThoiGian, 
        Lop.*, HocKi.*, MonHoc.*, TaiKhoan.* 
        FROM MonHocChiTiet 
        left join HocKi on MonHocChiTiet.MaHocKi = HocKi.MaHocKi
        left join Lop on MonHocChiTiet.MaLop = Lop.MaLop 
        left join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
		left join TaiKhoan on MonHoc.MaTaiKhoan = TaiKhoan.MaTaiKhoan
		Where Lop.MaLop = ${value} And Diem IS NULL`;
  },
  queryGetValueJoinOtherTableWithIdClassOfStudent: function (value) {
    return `SELECT MonHocChiTiet.Diem, MonHocChiTiet.ThoiGian, 
    Lop.*, HocKi.*, MonHoc.*, TaiKhoan.MaVaiTro, TaiKhoan.HoVaTen
    FROM MonHocChiTiet 
    left join HocKi on MonHocChiTiet.MaHocKi = HocKi.MaHocKi
    left join Lop on MonHocChiTiet.MaLop = Lop.MaLop 
    left join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
    left join TaiKhoan on Lop.MaLop = TaiKhoan.MaLop
    Where Lop.MaLop = ${value} and MaVaiTro = '01HS'
    and MonHocChiTiet.Diem IS NULL`;
  },

  queryGetValueJoinOtherTableWithIdAccount: function (value) {
    return `SELECT MonHocChiTiet.Diem, MonHocChiTiet.ThoiGian, 
        Lop.*, HocKi.*, MonHoc.*, TaiKhoan.* 
        FROM MonHocChiTiet 
        left join HocKi on MonHocChiTiet.MaHocKi = HocKi.MaHocKi
        left join Lop on MonHocChiTiet.MaLop = Lop.MaLop 
        left join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
		left join TaiKhoan on MonHoc.MaTaiKhoan = TaiKhoan.MaTaiKhoan
		Where TaiKhoan.MaTaiKhoan = '${value}' `;
  },
  queryGetDataToAddHocPhi: function (value) {
    return `SELECT 
        MonHocChiTiet.MaHocKi,
        MonHoc.MaMonHoc, 
        MonHoc.TenMonHoc,
        Lop.MaLop,
        TaiKhoan.MaTaiKhoan,
        MonHocChiTiet.isExport,
        SUM(MonHoc.SoTien) AS TongSoTien,
        HocKi.ThoiGianKetThuc
    FROM 
        TaiKhoan 
        JOIN Lop ON TaiKhoan.MaLop = Lop.MaLop
        JOIN MonHocChiTiet ON Lop.MaLop = MonHocChiTiet.MaLop 
        JOIN MonHoc ON MonHoc.MaMonHoc = MonHocChiTiet.MaMonHoc
        JOIN HocKi ON HocKi.MaHocKi = MonHocChiTiet.MaHocKi
    WHERE 
        TaiKhoan.MaTaiKhoan = '${value}' and MonHocChiTiet.isExport = 0
    GROUP BY 
        MonHocChiTiet.MaHocKi, 
        MonHoc.TenMonHoc,
        MonHocChiTiet.isExport,
        MonHoc.MaMonHoc,
        TaiKhoan.MaTaiKhoan,
        Lop.MaLop,
        HocKi.ThoiGianKetThuc;`;
  },
  queryGetDataToAddScore: function (value) {
    return `SELECT MonHocChiTiet.MaMonHoc,
        MonHoc.TenMonHoc, Lop.MaLop,Lop.TenLop, 
        MonHocChiTiet.Diem, TaiKhoan.MaTaiKhoan
        From MonHocChiTiet 
        join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
        join TaiKhoan on TaiKhoan.MaTaiKhoan = MonHoc.MaTaiKhoan
        join Lop on MonHocChiTiet.MaLop = Lop.MaLop
        WHERE 
        TaiKhoan.MaTaiKhoan = '${value}' AND MonHocChiTiet.Diem IS NULL
        GROUP BY
        MonHocChiTiet.MaMonHoc,
        MonHoc.TenMonHoc, MonHocChiTiet.Diem,
        TaiKhoan.MaTaiKhoan,
        Lop.TenLop,
        Lop.MaLop`;
  },
  queryGetDataForViewScore: function (MaLop) {
    return `SELECT MonHoc.TenMonHoc, TaiKhoan.HoVaTen,
    MonHocChiTiet.Diem, MonHocChiTiet.MaHocKi 
    FROM MonHoc JOIN TaiKhoan
    on MonHoc.MaTaiKhoan = TaiKhoan.MaTaiKhoan
    JOIN MonHocChiTiet
    on MonHoc.MaMonHoc = MonHocChiTiet.MaMonHoc
    WHERE MonHocChiTiet.MaLop = ${MaLop}`;
  },
  queryUpdateIsExport: function (isExport, idClass, idCourse, idSemester) {
    return `UPDATE MonHocChiTiet
        SET isExport = ${isExport}
        WHERE MaLop IN (
        SELECT Lop.MaLop FROM TaiKhoan 
        JOIN Lop on TaiKhoan.MaLop = Lop.MaLop
        WHERE Lop.MaLop = ${idClass}
        )
        AND 
        MonHocChiTiet.MaMonHoc = ${idCourse}
        AND MaHocKi = '${idSemester}'`;
  },
  queryUpdateScore: function (IdClass, IdCourse, IdSemester, Score) {
    return `UPDATE MonHocChiTiet 
    SET Diem = ${Score}
    WHERE MaLop = ${IdClass} AND MaMonHoc = ${IdCourse} 
    AND MaHocKi = '${IdSemester}'`;
  },
};
