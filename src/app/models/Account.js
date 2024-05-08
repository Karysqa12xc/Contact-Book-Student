const db = require("../../config/database");
const {queryGetAll, queryGetById} = require("../../utils/QueryCommon");
const {
  queryGetByOuterTableTaiKhoan,
  queryGetNullMaLopInTaiKhoan,
  queryCountQuantityAccountInClass,
  queryAddNewDataTableTaiKhoan,
  queryUpdateClassOfAccount,
  queryGetTaiKhoanByMaLop,
  queryGetDataAccountRefClassAndRole,
  queryUpdateLockedOfAccount,
} = require("../../utils/QueryTaiKhoan");
const tableName = "TaiKhoan";
const tableJoinRole = "VaiTro";
const tableJoinClass = "Lop";
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
        queryGetByOuterTableTaiKhoan(tableName, tableJoinRole)
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
  async updateDataIdClass(value, idAccount){
    try {
      const result = await db.connectAndQuerying(queryUpdateClassOfAccount(tableName, value, idAccount))
      return result;
    } catch (error) {
      console.log("Failed to update account id class:", error);
      throw error;
    }
  }
  async getByIdClass(id){
    try {
      const result = await db.connectAndQuerying(queryGetTaiKhoanByMaLop(tableName, id));
      return result;
    } catch (error) {
      console.log("Failed to get account by id class:", error);
      throw error;
    }
  }
  async getDataAccountRefRoleAndClass(){
    try {
      const result = await db.connectAndQuerying(queryGetDataAccountRefClassAndRole(tableName, tableJoinRole, tableJoinClass));
      return result;
    } catch (error) {
      console.log("Failed to get account reference by class and role:", error);
      throw error;
    }
  }
  async updateDataLockAccount(value, idAccount){
    try {
      const result = await db.connectAndQuerying(queryUpdateLockedOfAccount(tableName, value, idAccount))
      return result;
    } catch (error) {
      console.log("Failed to update account id class:", error);
      throw error;
    }
  }
}
module.exports = new AccountModel();
