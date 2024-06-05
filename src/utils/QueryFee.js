module.exports = {
    queryDocHocPHi: function(tableName, MaTaiKhoan) {
        return `SELECT HocPhi.MaHocKi, HocPhi.MaTaiKhoan
        ,MonHocChiTiet.MaMonHoc, MonHoc.TenMonHoc,
        HocPhi.HanDong,
        MonHoc.SoTien AS TongTien
        FROM ${tableName}
        JOIN MonHocChiTiet 
        on HocPhi.MaHocKi = MonHocChiTiet.MaHocKi
        JOIN MonHoc on MonHocChiTiet.MaMonHoc = MonHoc.MaMonHoc
        WHERE HocPhi.MaTaiKhoan = '${MaTaiKhoan}'
        GROUP BY 
         HocPhi.MaHocKi, HocPhi.MaTaiKhoan
        ,HocPhi.HanDong, MonHocChiTiet.MaMonHoc,
         MonHoc.TenMonHoc,
         MonHoc.SoTien`; 
    },
    queryAddNewDataFee: function(MaTaiKhoan, MaHocKi, HanDong, IsExport){
        return `INSERT INTO HocPhi(MaTaiKhoan, MaHocKi, HanDong, IsExport)
        VALUES('${MaTaiKhoan}', '${MaHocKi}', '${HanDong}', ${IsExport});`;
    }
};
