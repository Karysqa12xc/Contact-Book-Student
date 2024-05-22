module.exports = {
  queryAddNewDataRequest: function (
    tableName,
    TenYeuCau,
    NoiDung,
    MaTaiKhoanGui,
    MaTaiKhoanNhan,
    DaDoc
  ) {
    return `INSERT INTO ${tableName}(TenYeuCau, 
            NoiDung, MaTaiKhoanGui, MaTaiKhoanNhan, DaDoc)
        VALUES(N'${TenYeuCau}', N'${NoiDung}', '${MaTaiKhoanGui}'
            , '${MaTaiKhoanNhan}', ${DaDoc}
        )`;
  },
  queryGetRequestByIdNguoiGuiOrNhan: function(tableName, idNguoiGuiOrNhan, value){
    return `SELECT * FROM ${tableName}
    join TaiKhoan on ${tableName}.${idNguoiGuiOrNhan} 
    = TaiKhoan.MaTaiKhoan join VaiTro on TaiKhoan.MaVaiTro = VaiTro.MaVaiTro WHERE DaDoc = ${value}`;
  },
  queryGetOuterDataTableYeuCau: function(tableName, id){
    return `SELECT * FROM ${tableName} join TaiKhoan on 
    Yeu_Cau.MaTaiKhoanGui =
    TaiKhoan.MaTaiKhoan join VaiTro on TaiKhoan.MaVaiTro = VaiTro.MaVaiTro
    left join Lop on TaiKhoan.MaLop = Lop.MaLop WHERE MaYeuCau = ${id}`
  },
  queryGetRequestIsRead: function(tableName, value){
    return `SELECT * FROM ${tableName}
            WHERE DaDoc = ${value}`
  },
  queryUpdateWasRead: function(tableName, id, value){
    return `UPDATE ${tableName} SET DaDoc = ${value} WHERE MaYeuCau = ${id}`
  }
};
