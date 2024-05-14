module.exports = {
    queryDocHocPHi: function(tableName, MaTaiKhoan) {
        return `SELECT TongTien, HanDong, MaHocKi 
                FROM ${tableName} 
                WHERE MaTaiKhoan = '${MaTaiKhoan}'`; 
    }
};
