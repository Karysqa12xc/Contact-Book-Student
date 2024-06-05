module.exports = {
    queryAddScore: function (IdClass, IdCourse, IdSemester, IdAccount, Score) {
        return `INSERT INTO DiemMonHoc(MaMonHoc, MaLop, MaTaiKhoan, MaHocKi, Diem)
        VALUES(${IdCourse}, ${IdClass}, '${IdAccount}', '${IdSemester}', ${Score})`;
    },
    queryGetDataForViewScore: function (MaLop, MaTaiKhoan) {
      return `SELECT
      HocKi.MaHocKi, HocKi.TenHocKi,
      MonHoc.TenMonHoc, MonHoc.MaMonHoc,
	    (SELECT HoVaTen FROM TaiKhoan WHERE MaTaiKhoan = MonHoc.MaTaiKhoan) AS HoVaTen,
      Lop.MaLop
      ,TaiKhoan.MaVaiTro,TaiKhoan.MaTaiKhoan,
      DiemMonHoc.Diem
      FROM MonHocChiTiet 
        left join HocKi on MonHocChiTiet.MaHocKi = HocKi.MaHocKi
        left join Lop on MonHocChiTiet.MaLop = Lop.MaLop 
        left join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
        left join TaiKhoan on Lop.MaLop = TaiKhoan.MaLop
        left join DiemMonHoc on DiemMonHoc.MaMonHoc = MonHoc.MaMonHoc and 
        DiemMonHoc.MaTaiKhoan = TaiKhoan.MaTaiKhoan
    Where Lop.MaLop = ${MaLop} and MaVaiTro = '01HS'   
		    And TaiKhoan.MaTaiKhoan = '${MaTaiKhoan}'
    GROUP BY 
      TaiKhoan.MaVaiTro, 
      TaiKhoan.HoVaTen,
      HocKi.MaHocKi, 
      HocKi.TenHocKi,
      MonHoc.TenMonHoc,
      MonHoc.MaMonHoc,
      Lop.MaLop,
      TaiKhoan.MaTaiKhoan,
      DiemMonHoc.Diem,
	    MonHoc.MaTaiKhoan`;
    },
}