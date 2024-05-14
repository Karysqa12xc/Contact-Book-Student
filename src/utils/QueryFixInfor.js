module.exports = {
  queryFixInfor: function (
      tableName,
      HoVaTen,
      SoDienThoai,
      DiaChi,
      NamSinh,
      GioiTinh,
      MaLop,
      MaTaiKhoan
    ) {
      return `UPDATE ${tableName} 
              SET 
                  HoVaTen = '${HoVaTen}', 
                  SoDienThoai = '${SoDienThoai}', 
                  DiaChi = N'${DiaChi}', 
                  NamSinh = '${NamSinh}', 
                  GioiTinh = '${GioiTinh}', 
                  MaLop = ${MaLop} 
              WHERE 
                  MaTaiKhoan = ${MaTaiKhoan}`;
    },
}
