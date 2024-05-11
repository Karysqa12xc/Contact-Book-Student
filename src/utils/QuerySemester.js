module.exports = {
    queryAddNewDataSemester: function(tableName, MaHocKi, TenHocKi, ThoiGianBatDau, ThoiGianKetThuc){
        return `INSERT INTO ${tableName}
        (Ma${tableName}, Ten${tableName}, ThoiGianBatDau, ThoiGianKetThuc)
        VALUES('${MaHocKi}', N'${TenHocKi}', 
        '${ThoiGianBatDau}',
        '${ThoiGianKetThuc}'
        )`;
    }
}