module.exports = {
    queryDocHocPHi: function(tableName, MaTaiKhoan) {
        return `SELECT HocPhi.MaHocKi, HocPhi.MaTaiKhoan
        ,MonHocChiTiet.MaMonHoc, MonHoc.TenMonHoc,
        HocPhi.TongTien, HocPhi.HanDong
        FROM ${tableName}
        JOIN MonHocChiTiet 
        on HocPhi.MaHocKi = MonHocChiTiet.MaHocKi
        JOIN MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
        WHERE HocPhi.MaTaiKhoan = '${MaTaiKhoan}'
        GROUP BY 
         HocPhi.MaHocKi, HocPhi.MaTaiKhoan
        ,HocPhi.HanDong, MonHocChiTiet.MaMonHoc,
         MonHoc.TenMonHoc,
         HocPhi.TongTien`; 
    },
    queryAddNewDataFee: function(MaTaiKhoan, SoTien, MaHocKi, HanDong){
        return `INSERT INTO HocPhi(MaTaiKhoan, MaHocKi, TongTien, HanDong)
        VALUES('${MaTaiKhoan}', '${MaHocKi}', ${SoTien}, '${HanDong}');`;
    }
};
