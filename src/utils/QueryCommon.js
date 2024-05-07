module.exports = {
  queryGetAll: function (tableName) {
    return `SELECT * FROM ${tableName}`;
  },
  queryGetAllReverse: function (tableName) {
    return `SELECT * 
    FROM ${tableName} 
    ORDER BY Ten${tableName}`;
  },
  queryGetById: function (tableName, id) {
    return `SELECT * 
    FROM ${tableName} 
    Where Ma${tableName} = '${id}'`;
  },
  queryUpdateClassOfAccount: function(tableName, value, idTaiKhoan){
      return `UPDATE TaiKhoan 
      SET MaLop = ${value}
      WHERE MaTaiKhoan = '${idTaiKhoan}'`;
  },
  queryGetTaiKhoanByMaLop: function(tableName, idClass){
    return `SELECT * FROM ${tableName} Where MaLop = ${idClass}`;
  },
  queryGetNullMaLopInTaiKhoan: function(tableName){
    return `SELECT * 
    FROM ${tableName} 
    Where MaLop IS NULL AND MaVaiTro = '01HS'`;
  },
  queryGetByOuterTableTaiKhoan: function (tableName, tableJoin) {
    return `SELECT MaTaiKhoan, TenTaiKhoan, 
    MatKhau, HoVaTen, SoDienThoai, 
    DiaChi, NamSinh, GioiTinh, KhoaTaiKhoan, 
    ${tableName}.MaVaiTro, ${tableName}.MaLop, 
    Ten${tableJoin}
    FROM ${tableName} JOIN ${tableJoin} 
    ON ${tableName}.Ma${tableJoin} = ${tableJoin}.Ma${tableJoin}`;
  },
  queryAddNewDataTableTaiKhoan: function (
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
    return `INSERT INTO ${tableName}(MaTaiKhoan, 
      TenTaiKhoan, MatKhau 
      ,HoVaTen, SoDienThoai, DiaChi,
      NamSinh, GioiTinh, KhoaTaiKhoan ,MaLop, MaVaiTro)
      VALUES('${MaTaiKhoan}', '${TenTaiKhoan}', 
      '${MatKhau}', N'${HoVaTen}', 
      '${SoDienThoai}', N'${DiaChi}', '${NamSinh}', 
      '${GioiTinh}', '${KhoaTaiKhoan}', ${MaLop}, 
      '${MaVaiTro}')`;
  },
  queryCountQuantityAccountInClass: function(tableName, id){
      return `SELECT COUNT(*) 
      AS "HocSinhTrongLop" 
      FROM ${tableName} 
      Where MaLop = ${id};`;
  },
  queryAddNewDataTableLop: function(tableName, TenLop, SiSo){
    return `INSERT INTO ${tableName}(TenLop, SiSo)
            VALUES('${TenLop}', ${SiSo})`;
  }
};
