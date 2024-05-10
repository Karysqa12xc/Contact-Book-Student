module.exports = {
    queryFixInfor: function (
        tableName,
        HoVaTen,
        SoDienThoai,
        DiaChi,
        NamSinh,
        GioiTinh,
        MaLop,
      ) {
        return `INSERT INTO ${tableName}(
            HoVaTen, SoDienThoai, DiaChi,
            NamSinh, GioiTinh,MaLop)
            VALUES('${HoVaTen}', 
            '${SoDienThoai}', N'${DiaChi}', '${NamSinh}', 
            '${GioiTinh}', ${MaLop}, 
            )`;
      },
}
