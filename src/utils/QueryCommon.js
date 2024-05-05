module.exports = {
  queryGetAll: function (tableName) {
    return `SELECT * FROM ${tableName}`;
  },
  queryGetById: function (tableName, id) {
    return `SELECT * FROM ${tableName} Where Ma${tableName} = '${id}'`;
  },
  queryGetByOuterTableTaiKhoan: function (tableName, tableJoin) {
    return `SELECT MaTaiKhoan, TenTaiKhoan, 
    MatKhau, HoVaTen, SoDienThoai, 
    DiaChi, NamSinh, GioiTinh, KhoaTaiKhoan, 
    ${tableName}.MaVaiTro, ${tableName}.MaLop, Ten${tableJoin}
    FROM ${tableName} JOIN ${tableJoin} 
    ON ${tableName}.Ma${tableJoin} = ${tableJoin}.Ma${tableJoin}`;
  },
  queryAddNewDateTableTaiKhoan: function (
    tableName,
    MaTaiKhoan,
    TenTaiKhoan,
    MatKhau,
    HoVaTen,
    SoDienThoai,
    DiaChi,
    NamSinh,
    GioiTinh,
    KhoaTaiKhoan,
    MaLop,
    MaVaiTro
  ) {
    return `INSERT INTO ${tableName}(MaTaiKhoan, TenTaiKhoan, MatKhau ,HoVaTen, SoDienThoai, DiaChi,
      NamSinh, GioiTinh, KhoaTaiKhoan ,MaLop, MaVaiTro)
      VALUES('${MaTaiKhoan}', '${TenTaiKhoan}', '${MatKhau}', N'${HoVaTen}', 
        '${SoDienThoai}', N'${DiaChi}', '${NamSinh}', 
        '${GioiTinh}', '${KhoaTaiKhoan}', ${MaLop}, '${MaVaiTro}')`;
  },
};
