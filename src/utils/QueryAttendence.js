module.exports = {
    queryAddNewDataAttendance: function(MaHocKi, MaLop, MaMonHoc, ThoiGian, MaTaiKhoan, TrangThai){
        return `INSERT INTO DiemDanh(MaHocKi, MaLop, MaMonHoc, ThoiGian, MaTaiKhoan, TrangThai)
        VALUES('${MaHocKi}', '${MaLop}', ${MaMonHoc}, '${ThoiGian}', ${MaTaiKhoan}, ${TrangThai});`;
    }
};