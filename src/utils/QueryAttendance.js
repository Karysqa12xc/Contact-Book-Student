module.exports = {
    queryAddNewDataAttendance: function(IdSemester, IdClass, IdCourse, IdAccount ,ThoiGian, attendance){
        return  `INSERT INTO DiemDanh(MaHocKi, MaLop, MaMonHoc, MaTaiKhoan, ThoiGianDiemDanh, TrangThai)
        VALUES ('${IdSemester}', ${IdClass}, ${IdCourse}, '${IdAccount}', N'${ThoiGian}', ${attendance})`
    }
}