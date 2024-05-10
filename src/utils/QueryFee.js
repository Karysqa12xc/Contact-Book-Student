module.exports = {
    queryDocHocPHi: function(tableName, TenLop, SiSo){
        return ` Select TongTien, HanDong, MaHocKi
                From ${tableName}`;
    },
}