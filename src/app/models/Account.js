const db = require("../../config/database");
const {
  queryGetAll,
  queryGetById,
  queryGetByOuterTableTaiKhoan,
  queryGetNullMaLopInTaiKhoan,
  queryCountQuantityAccountInClass,
  queryAddNewDataTableTaiKhoan,
  queryUpdateClassOfAccount,
} = require("../../utils/QueryCommon");
const tableName = "TaiKhoan";
const tableJoin = "VaiTro";
class AccountModel {
  async getAll() {
    try {
      const results = await db.connectAndQuerying(queryGetAll(tableName));
      return results;
    } catch (error) {
      console.log("Failed to get all account:", error);
      throw error;
    }
  }
  async getById(id) {
    try {
      const result = await db.connectAndQuerying(queryGetById(tableName, id));
      return result;
    } catch (error) {
      console.log("Failed to get account by id:", error);
      throw error;
    }
  }
  async getAttributeOutTable() {
    try {
      const result = await db.connectAndQuerying(
        queryGetByOuterTableTaiKhoan(tableName, tableJoin)
      );
      return result;
    } catch (error) {
      console.log("Failed to get account by outer table:", error);
      throw error;
    }
  }
  async addNewData(
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
    try {
      const result = await db.connectAndQuerying(
        queryAddNewDataTableTaiKhoan(
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
        )
      );
      return result;
    } catch (error) {
      console.log("Failed to add a new account:", error);
      throw error;
    }
  }
  async CountAccountInClass(id){
    try {
      const result = await db.connectAndQuerying(queryCountQuantityAccountInClass(tableName, id));
      return result;
    } catch (error) {
      console.log("Failed to count account in class:", error);
      throw error;
    }
  }
  async getDataIdClassNull(){
    try {
      const result = await db.connectAndQuerying(queryGetNullMaLopInTaiKhoan(tableName));
      return result;
    } catch (error) {
      console.log("Failed to get account id class null:", error);
      throw error;
    }
  }
  async updateDateIdClass(idClass, idAccount){
    try {
      const result = await db.connectAndQuerying(queryUpdateClassOfAccount(tableName, idClass, idAccount))
    } catch (error) {
      console.log("Failed to update account id class:", error);
      throw error;
    }
  }
}
module.exports = new AccountModel();
