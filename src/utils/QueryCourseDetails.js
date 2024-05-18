module.exports = {
    queryAddNewDataToCourseDetails: function(tableName, idSemester, idClass, idCourse, dayValue){
        return `INSERT INTO ${tableName}
        (MaHocKi, MaLop, MaMonHoc, ThoiGian)
        VALUES('${idSemester}', 
        ${idClass}, 
        ${idCourse}, N'${dayValue}')`;
    },
    queryGetAllValueJoinOtherTable: function(){
        return `SELECT MonHocChiTiet.Diem, MonHocChiTiet.ThoiGian, 
        Lop.*, HocKi.*, MonHoc.*, TaiKhoan.* 
        FROM MonHocChiTiet 
        left join HocKi on MonHocChiTiet.MaHocKi = HocKi.MaHocKi
        left join Lop on MonHocChiTiet.MaLop = Lop.MaLop 
        left join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
		left join TaiKhoan on MonHoc.MaTaiKhoan = TaiKhoan.MaTaiKhoan`;
    }
}