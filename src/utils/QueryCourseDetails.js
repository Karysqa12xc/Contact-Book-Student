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
        Lop.*, HocKi.*, MonHoc.* 
        FROM MonHocChiTiet 
        join HocKi on MonHocChiTiet.MaHocKi = HocKi.MaHocKi
        join Lop on MonHocChiTiet.MaLop = Lop.MaLop 
        join MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc`;
    }
}