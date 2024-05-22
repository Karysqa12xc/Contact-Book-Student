module.exports = {
    queryDocHocPHi: function(tableName, MaTaiKhoan) {
        return `SELECT TongTien, HanDong, MaHocKi 
                FROM ${tableName} 
                WHERE MaTaiKhoan = '${MaTaiKhoan}'`; 
    },
    queryAddNewDataFee: function(MaTaiKhoan, SoTien, MaHocKi, HanDong){
        return `INSERT INTO HocPhi(MaTaiKhoan, MaHocKi, TongTien, HanDong)
        VALUES('${MaTaiKhoan}', '${MaHocKi}', ${SoTien}, '${HanDong}');`;
    }
};
