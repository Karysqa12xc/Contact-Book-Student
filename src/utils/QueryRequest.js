module.exports = {
  queryAddNewDataRequest: function (
    tableName,
    TenYeuCau,
    NoiDung,
    MaTaiKhoanGui,
    MaTaiKhoanNhan
  ) {
    return `INSERT INTO ${tableName}(TenYeuCau, 
            NoiDung, MaTaiKhoanGui, MaTaiKhoanNhan)
        VALUES(N'${TenYeuCau}', N'${NoiDung}', '${MaTaiKhoanGui}'
            , '${MaTaiKhoanNhan}'
        )`;
  },
  queryGetRequestByIdNguoiGuiOrNhan: function(tableName, idNguoiGuiOrNhan){
    return `SELECT * FROM ${tableName}
    join TaiKhoan on ${tableName}.${idNguoiGuiOrNhan} 
    = TaiKhoan.MaTaiKhoan join VaiTro on TaiKhoan.MaVaiTro = VaiTro.MaVaiTro`;
  },
  queryGetOuterDataTableYeuCau: function(tableName, id){
    return `SELECT * FROM ${tableName} join TaiKhoan on 
    Yeu_Cau.MaTaiKhoanGui =
    TaiKhoan.MaTaiKhoan join VaiTro on TaiKhoan.MaVaiTro = VaiTro.MaVaiTro
    left join Lop on TaiKhoan.MaLop = Lop.MaLop WHERE MaYeuCau = ${id}`
  }
};
