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
  queryGetOnlyThoiGianVaMonHocInCourseDetails: function (value) {
    return `SELECT ThoiGian, TenMonHoc FROM MonHocChiTiet 
    JOIN MonHoc ON MonHoc.MaMonHoc = MonHocChiTiet.MaMonHoc
    WHERE MaHocKi = '${value}'
    GROUP BY 
    ThoiGian, TenMonHoc;`;
  },
  
  queryGetAllValueJoinOtherTable: function () {
    return `SELECT MonHocChiTiet.MaMonHocChiTiet, MonHocChiTiet.ThoiGian, 
        Lop.*, HocKi.*, MonHoc.*, TaiKhoan.* 
        FROM MonHocChiTiet 
        left join HocKi on MonHocChiTiet.MaHocKi = HocKi.MaHocKi
        left join Lop on MonHocChiTiet.MaLop = Lop.MaLop 
        left join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
		    left join TaiKhoan on MonHoc.MaTaiKhoan = TaiKhoan.MaTaiKhoan`;
  },
  queryGetValueJoinOtherTableWithIdClassOfTeacher: function (value) {
    return `SELECT MonHocChiTiet.ThoiGian, 
        Lop.*, HocKi.*, MonHoc.*, TaiKhoan.* 
        FROM MonHocChiTiet 
        left join HocKi on MonHocChiTiet.MaHocKi = HocKi.MaHocKi
        left join Lop on MonHocChiTiet.MaLop = Lop.MaLop 
        left join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
		left join TaiKhoan on MonHoc.MaTaiKhoan = TaiKhoan.MaTaiKhoan
		Where Lop.MaLop = ${value}`;
  },
  queryGetValueJoinOtherTableWithIdClassOfStudent: function (MaLop, MaMonHoc) {
    return `SELECT
    HocKi.MaHocKi, HocKi.TenHocKi,
	  MonHoc.TenMonHoc, MonHoc.MaMonHoc,
    Lop.MaLop
	  ,TaiKhoan.MaVaiTro, TaiKhoan.HoVaTen,
    TaiKhoan.MaTaiKhoan,
    DiemMonHoc.Diem
    FROM MonHocChiTiet 
      left join HocKi on MonHocChiTiet.MaHocKi = HocKi.MaHocKi
      left join Lop on MonHocChiTiet.MaLop = Lop.MaLop 
      left join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
      left join TaiKhoan on Lop.MaLop = TaiKhoan.MaLop
      left join DiemMonHoc on DiemMonHoc.MaMonHoc = MonHoc.MaMonHoc and 
	    DiemMonHoc.MaTaiKhoan = TaiKhoan.MaTaiKhoan
      Where Lop.MaLop = ${MaLop} and MaVaiTro = '01HS'
      and MonHoc.MaMonHoc = ${MaMonHoc} 
	GROUP BY 
	  TaiKhoan.MaVaiTro, 
	  TaiKhoan.HoVaTen,
	  HocKi.MaHocKi, 
	  HocKi.TenHocKi,
	  MonHoc.TenMonHoc,
    MonHoc.MaMonHoc,
    Lop.MaLop,
    TaiKhoan.MaTaiKhoan,
    DiemMonHoc.Diem`;
  },
  queryGetValueJoinOtherTableWithIdAccount: function (value) {
    return `SELECT MonHocChiTiet.ThoiGian, 
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
    AND MonHocChiTiet.MaHocKi Is Not Null
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
  queryGetDataClassOfTeacher: function (value) {
    return `SELECT Lop.MaLop,Lop.TenLop, 
    TaiKhoan.MaTaiKhoan
    From MonHocChiTiet 
    join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
    join TaiKhoan on TaiKhoan.MaTaiKhoan = MonHoc.MaTaiKhoan
    join Lop on MonHocChiTiet.MaLop = Lop.MaLop
    WHERE 
    TaiKhoan.MaTaiKhoan = '${value}' 
    GROUP BY
    TaiKhoan.MaTaiKhoan,
    Lop.TenLop,
    Lop.MaLop`;
  },
  queryGetDataToAddAttendance: function (IdClass, IdSemester, ThoiGian, MonHoc) {
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
    AND MonHoc.TenMonHoc = N'${MonHoc}'
    AND ThoiGian = N'${ThoiGian}'
    AND MonHocChiTiet.ThoiGian 
    NOT IN (SELECT ThoiGianDiemDanh FROM DiemDanh)
  GROUP BY  
    MonHoc.TenMonHoc,
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
        MonHoc.TenMonHoc, Lop.MaLop,
        Lop.TenLop, 
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
        Lop.MaLop`;
  },
  queryGetDataForViewScore: function (MaLop) {
    return `SELECT MonHoc.TenMonHoc, TaiKhoan.HoVaTen,
    MonHocChiTiet.MaHocKi,
    HocKi.TenHocKi,
    DiemMonHoc.Diem
    FROM MonHoc JOIN TaiKhoan
    on MonHoc.MaTaiKhoan = TaiKhoan.MaTaiKhoan
    JOIN MonHocChiTiet
    on MonHoc.MaMonHoc = MonHocChiTiet.MaMonHoc
	  JOIN HocKi
	  on HocKi.MaHocKi = MonHocChiTiet.MaHocKi
    LEFT JOIN DiemMonHoc ON MonHoc.MaMonHoc = DiemMonHoc.MaMonHoc
    WHERE MonHocChiTiet.MaLop = ${MaLop}`;
  },
  
  queryDeleteScore: function (id) {
    return `DELETE FROM MonHocChiTiet WHERE MaMonHocChiTiet = ${id}`;
  },
};
