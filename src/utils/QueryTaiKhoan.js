module.exports = {
  queryUpdateLockedOfAccount: function (tableName, value, idTaiKhoan) {
    return `UPDATE TaiKhoan 
    SET KhoaTaiKhoan = ${value}
    WHERE MaTaiKhoan = '${idTaiKhoan}'`;
  },
  queryUpdateClassOfAccount: function (tableName, value, idTaiKhoan) {
    return `UPDATE ${tableName} 
        SET MaLop = ${value}
        WHERE MaTaiKhoan = '${idTaiKhoan}'`;
  },
  queryGetTaiKhoanByMaLop: function (tableName, idClass) {
    return `SELECT * FROM ${tableName} Where MaLop = ${idClass}`;
  },
  queryGetNullMaLopInTaiKhoan: function (tableName) {
    return `SELECT * 
      FROM ${tableName} 
      Where MaLop IS NULL AND MaVaiTro = '01HS'`;
  },
  queryGetDataNotNullMaLopInTaiKhoan: function (tableName) {
    return `SELECT * 
      FROM ${tableName} 
      Where MaLop IS NOT NULL AND MaVaiTro = '01HS'`;
  },
  queryGetTeacherInTaiKhoan: function (tableName) {
    return `SELECT * 
      FROM ${tableName} 
      Where MaVaiTro = '01GV'`;
  },
  queryGetByOuterTableTaiKhoan: function (tableName, tableJoin) {
    return `SELECT ${tableName}.MaTaiKhoan, TenTaiKhoan, 
      MatKhau, HoVaTen, SoDienThoai, 
      DiaChi, NamSinh, GioiTinh, KhoaTaiKhoan, 
      ${tableName}.MaVaiTro, ${tableName}.MaLop, 
      Ten${tableJoin}, TenLop, TenMonHoc
      FROM ${tableName} JOIN ${tableJoin} 
      ON ${tableName}.Ma${tableJoin} = ${tableJoin}.Ma${tableJoin}
      LEFT JOIN Lop on ${tableName}.MaLop = Lop.MaLop
      LEFT JOIN MonHoc on ${tableName}.MaTaiKhoan = MonHoc.MaTaiKhoan`;
  },
  queryGetDataAccountRefClassAndRole: function (
    tableName,
    tableJoinRole,
    tableJoinClass
  ) {
    return `SELECT ${tableName}.*, ${tableJoinClass}.Ten${tableJoinClass}, ${tableJoinRole}.Ten${tableJoinRole} 
        FROM ${tableName} join ${tableJoinRole} 
        on ${tableName}.Ma${tableJoinRole} 
        = ${tableJoinRole}.Ma${tableJoinRole}
        left join ${tableJoinClass}
        on ${tableName}.Ma${tableJoinClass}
         = ${tableJoinClass}.Ma${tableJoinClass}
         WHERE ${tableName}.Ma${tableJoinRole} != '01AD'`;
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
  queryCountQuantityAccountInClass: function (tableName, id) {
    return `SELECT COUNT(*) 
        AS "HocSinhTrongLop" 
        FROM ${tableName} 
        Where MaLop = ${id};`;
  },
  queryUpdateAccount: function (tableName, HoVaTen, SoDienThoai, DiaChi, MatKhau, MaTaiKhoan) {
    return ` UPDATE ${tableName}
    SET
      HoVaTen = N'${HoVaTen}',
      SoDienThoai = '${SoDienThoai}',
      DiaChi = N'${DiaChi}',
      MatKhau = '${MatKhau}'
    WHERE MaTaiKhoan = '${MaTaiKhoan}'`
  }
};
