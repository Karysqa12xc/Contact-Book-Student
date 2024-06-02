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
  queryGetOnlyThoiGianInCourseDetails: function (value) {
    return `SELECT ThoiGian FROM MonHocChiTiet 
    WHERE MaHocKi = '${value}'`;
  },
  queryGetAllValueJoinOtherTable: function () {
    return `SELECT MonHocChiTiet.MaMonHocChiTiet ,MonHocChiTiet.Diem, MonHocChiTiet.ThoiGian, 
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
		Where Lop.MaLop = ${value}`;
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
    Lop.TenLop,
    TaiKhoan.MaTaiKhoan,
	HocPhi.IsExport,
    TaiKhoan.HoVaTen,
    SUM(MonHoc.SoTien) AS TongSoTien,
    HocKi.ThoiGianKetThuc
  FROM 
    TaiKhoan 
    LEFT JOIN Lop ON TaiKhoan.MaLop = Lop.MaLop
    LEFT JOIN MonHocChiTiet ON Lop.MaLop = MonHocChiTiet.MaLop 
    LEFT JOIN MonHoc ON MonHoc.MaMonHoc = MonHocChiTiet.MaMonHoc
    LEFT JOIN HocKi ON HocKi.MaHocKi = MonHocChiTiet.MaHocKi
	  LEFT JOIN HocPhi ON HocPhi.MaTaiKhoan = TaiKhoan.MaTaiKhoan
    AND 
	  HocPhi.MaHocKi = HocKi.MaHocKi
  WHERE 
    Lop.MaLop = ${value}
  GROUP BY 
    MonHocChiTiet.MaHocKi, 
    MonHoc.TenMonHoc,
    MonHoc.MaMonHoc,
    TaiKhoan.MaTaiKhoan,
    TaiKhoan.HoVaTen,
    Lop.MaLop,
    Lop.TenLop,
	HocPhi.IsExport,
    HocKi.ThoiGianKetThuc;`;
  },
  queryGetDataClassOfTeacher: function(value){
    return `SELECT MonHocChiTiet.MaMonHoc,
    MonHoc.TenMonHoc, Lop.MaLop,Lop.TenLop, 
    TaiKhoan.MaTaiKhoan
    From MonHocChiTiet 
    join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
    join TaiKhoan on TaiKhoan.MaTaiKhoan = MonHoc.MaTaiKhoan
    join Lop on MonHocChiTiet.MaLop = Lop.MaLop
    WHERE 
    TaiKhoan.MaTaiKhoan = '${value}' 
    GROUP BY
    MonHocChiTiet.MaMonHoc,
    MonHoc.TenMonHoc,
    TaiKhoan.MaTaiKhoan,
    Lop.TenLop,
    Lop.MaLop`
  },
  queryGetDataToAddAttendance: function (IdClass, IdSemester) {
    return `SELECT 
        MonHoc.MaMonHoc, 
        MonHoc.TenMonHoc,
        Lop.MaLop,Lop.TenLop,
        TaiKhoan.MaTaiKhoan,
        TaiKhoan.HoVaTen,
		MonHocChiTiet.ThoiGian,
		HocKi.MaHocKi
    FROM 
        TaiKhoan 
        LEFT JOIN Lop ON TaiKhoan.MaLop = Lop.MaLop
        LEFT JOIN MonHocChiTiet ON Lop.MaLop = MonHocChiTiet.MaLop 
        LEFT JOIN MonHoc ON MonHoc.MaMonHoc = MonHocChiTiet.MaMonHoc
        LEFT JOIN HocKi ON HocKi.MaHocKi = MonHocChiTiet.MaHocKi
    WHERE 
        Lop.MaLop = ${IdClass} AND HocKi.MaHocKi = '${IdSemester}' 
        AND MonHocChiTiet.ThoiGian 
		    NOT IN (SELECT ThoiGianDiemDanh FROM DiemDanh)
    GROUP BY  
        MonHoc.TenMonHoc,
        MonHocChiTiet.isExport,
        MonHoc.MaMonHoc,
        TaiKhoan.MaTaiKhoan,
        Lop.MaLop,
        TaiKhoan.HoVaTen,
		MonHocChiTiet.ThoiGian,
    Lop.TenLop,
		HocKi.MaHocKi`;
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
    MonHocChiTiet.Diem, MonHocChiTiet.MaHocKi,
    HocKi.TenHocKi
    FROM MonHoc JOIN TaiKhoan
    on MonHoc.MaTaiKhoan = TaiKhoan.MaTaiKhoan
    JOIN MonHocChiTiet
    on MonHoc.MaMonHoc = MonHocChiTiet.MaMonHoc
	  JOIN HocKi
	  on HocKi.MaHocKi = MonHocChiTiet.MaHocKi
    WHERE MonHocChiTiet.MaLop = ${MaLop}`;
  },
  queryUpdateScore: function (IdClass, IdCourse, IdSemester, Score) {
    return `UPDATE MonHocChiTiet 
    SET Diem = ${Score}
    WHERE MaLop = ${IdClass} AND MaMonHoc = ${IdCourse} 
    AND MaHocKi = '${IdSemester}'`;
  },
  queryDeleteScore: function(id){
    return `DELETE FROM MonHocChiTiet WHERE MaMonHocChiTiet = ${id}`;
  }
};
